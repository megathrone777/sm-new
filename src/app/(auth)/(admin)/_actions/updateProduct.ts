"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { authHelpers, modifiersHelpers, productsHelpers } from "@/helpers";
import { redis } from "@/lib";

const PRODUCTS_SEARCH_PREFIX = "product:";

const updateProduct = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<null | TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const slug = formData.get("slug") as string;
  const prevProduct = await productsHelpers.getProductBySlug(slug);

  if (!prevProduct) {
    return {
      message: `Product ${slug} not found`,
      type: "error",
    };
  }

  const modifierIds = formData.getAll("modifierIds").map(Number);
  const allModifiers = await modifiersHelpers.getModifiers();
  const modifiers = allModifiers.filter(({ id }) => modifierIds.includes(id));

  const newProduct: TProduct = {
    ...prevProduct,
    allergens: (formData.get("allergens") as string) || null,
    composition: formData.get("composition") as string,
    description: (formData.get("description") as string) || null,
    imageUrl: prevProduct.imageUrl,
    isAvailable: formData.get("isAvailable") === "on",
    modifiers,
    modifiersTitle: (formData.get("modifiersTitle") as string) || null,
    price: Number(formData.get("price")),
    requiredModifier: formData.get("requiredModifier") === "on",
    title: formData.get("title") as string,
    weight: formData.get("weight") as string,
  };

  const imageFile = formData.get("image") as File;

  if (imageFile?.size) {
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `${Date.now()}${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", "products", filename);

    await fs.writeFile(filePath, Buffer.from(await imageFile.arrayBuffer()));

    if (prevProduct.imageUrl) {
      await fs.unlink(path.join(process.cwd(), "public", prevProduct.imageUrl)).catch(() => {});
    }

    newProduct.imageUrl = `/uploads/products/${filename}`;
  }

  const categoryMoved = prevProduct.categoryId !== newProduct.categoryId;
  const [oldCategory, newCategory] = await Promise.all([
    productsHelpers.getCategoryById(prevProduct.categoryId),
    categoryMoved ? productsHelpers.getCategoryById(newProduct.categoryId) : Promise.resolve(null),
  ]);

  if (!oldCategory) {
    return {
      message: `Category ${prevProduct.categoryId} not found`,
      type: "error",
    };
  }

  if (categoryMoved && !newCategory) {
    return {
      message: `Category ${newProduct.categoryId} not found`,
      type: "error",
    };
  }

  const pipeline = redis.pipeline();

  pipeline.hset("products", { [newProduct.slug]: JSON.stringify(newProduct) });
  pipeline.hset(`${PRODUCTS_SEARCH_PREFIX}${newProduct.id}`, {
    id: newProduct.id,
    imageUrl: newProduct.imageUrl,
    price: newProduct.price,
    slug: newProduct.slug,
    title: newProduct.title,
  });

  if (categoryMoved) {
    pipeline.hset("categories", {
      [prevProduct.categoryId]: JSON.stringify({
        ...oldCategory,
        products: oldCategory.products.filter(({ id }: TProduct): boolean => id !== newProduct.id),
      }),
    });
    pipeline.hset("categories", {
      [newProduct.categoryId]: JSON.stringify({
        ...newCategory!,
        products: [...newCategory!.products, newProduct],
      }),
    });
  } else {
    pipeline.hset("categories", {
      [newProduct.categoryId]: JSON.stringify({
        ...oldCategory,
        products: oldCategory.products.map(
          (product: TProduct): TProduct => (product.id === newProduct.id ? newProduct : product),
        ),
      }),
    });
  }

  await pipeline.exec();

  revalidatePath(`/admin/product/${slug}`);
  revalidatePath("/admin/products");

  return {
    message: `Product "${newProduct.title}" updated`,
    type: "success",
  };
};

export { updateProduct };

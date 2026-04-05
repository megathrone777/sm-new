"use server";
import { revalidatePath } from "next/cache";

import { authHelpers, modifiersHelpers, productsHelpers } from "@/helpers";
import { redis } from "@/lib";

const PRODUCTS_SEARCH_PREFIX = "product:";

const updateProduct = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const slug = formData.get("slug") as string;
  const prevProduct = await productsHelpers.getProductBySlug(slug);

  if (!prevProduct) throw new Error(`Product ${slug} not found`);

  // Hydrate selected modifiers from the modifiers table
  const modifierIds = formData.getAll("modifierIds").map(Number);
  const allModifiers = await modifiersHelpers.getModifiers();
  const modifiers = allModifiers.filter(({ id }) => modifierIds.includes(id));

  const newProduct: TProduct = {
    ...prevProduct,
    allergens: (formData.get("allergens") as string) || null,
    composition: formData.get("composition") as string,
    description: (formData.get("description") as string) || null,
    isAvailable: formData.get("isAvailable") === "on",
    modifiers,
    modifiersTitle: (formData.get("modifiersTitle") as string) || null,
    price: Number(formData.get("price")),
    requiredModifier: formData.get("requiredModifier") === "on",
    title: formData.get("title") as string,
    weight: formData.get("weight") as string,
  };

  const categoryMoved = prevProduct.categoryId !== newProduct.categoryId;
  const [oldCategory, newCategory] = await Promise.all([
    productsHelpers.getCategoryById(prevProduct.categoryId),
    categoryMoved ? productsHelpers.getCategoryById(newProduct.categoryId) : Promise.resolve(null),
  ]);

  if (!oldCategory) throw new Error(`Category ${prevProduct.categoryId} not found`);
  if (categoryMoved && !newCategory) throw new Error(`Category ${newProduct.categoryId} not found`);

  const pipeline = redis.pipeline();

  pipeline.hset("products", { [newProduct.slug]: JSON.stringify(newProduct) });

  // Keep the search hash in sync
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
};

export { updateProduct };

"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { productsHelpers } from "@/helpers/products";
import { redis } from "@/store";

const updateCategory = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = Number(formData.get("id"));
  const title = (formData.get("title") as string).trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const productSlugs = formData.getAll("productSlugs") as string[];

  const prev = await productsHelpers.getCategoryById(id);

  if (!prev) return { message: `Category ${id} not found`, type: "error" };

  let { imageUrl } = prev;

  const imageFile = formData.get("image") as File;

  if (imageFile?.size) {
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `${Date.now()}${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", "categories", filename);

    await fs.writeFile(filePath, Buffer.from(await imageFile.arrayBuffer()));

    if (prev.imageUrl) {
      await fs.unlink(path.join(process.cwd(), "public", prev.imageUrl)).catch(() => {});
    }

    imageUrl = `/uploads/categories/${filename}`;
  }

  const updated: TProductCategory = {
    ...prev,
    imageUrl,
    sortOrder,
    title,
  };

  const allCategories = await productsHelpers.getCategories();
  const allProducts = allCategories.find((c: TProductCategory) => c.id === 0)?.products ?? [];

  const fallbackCategory = allCategories
    .filter((c: TProductCategory) => c.id !== 0 && c.id !== id)
    .sort((a: TProductCategory, b: TProductCategory) => a.id - b.id)[0];

  const pipeline = redis.pipeline();

  pipeline.hset("categories", { [id]: JSON.stringify(updated) });

  for (const product of allProducts) {
    const shouldBeInThisCategory = productSlugs.includes(product.slug);
    const currentlyInThisCategory = product.categoryId === id;

    if (shouldBeInThisCategory && !currentlyInThisCategory) {
      pipeline.hset("products", {
        [product.slug]: JSON.stringify({ ...product, categoryId: id }),
      });
    } else if (!shouldBeInThisCategory && currentlyInThisCategory && fallbackCategory) {
      pipeline.hset("products", {
        [product.slug]: JSON.stringify({ ...product, categoryId: fallbackCategory.id }),
      });
    }
  }

  await pipeline.exec();

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/category/${id}`);

  return { message: `Category "${title}" updated`, type: "success" };
};

export { updateCategory };

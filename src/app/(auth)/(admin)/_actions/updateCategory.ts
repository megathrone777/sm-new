"use server";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { redis, store } from "@/store";

const updateCategory = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = +formData.get("id")!;
  const title = `${formData.get("title") ?? ""}`.trim();
  const sortOrder = +(formData.get("sortOrder") ?? 0);
  const productSlugs = formData.getAll("productSlugs") as string[];

  const prev = await store.categories.getById(id);

  if (!prev) return { message: `Category ${id} not found`, type: "error" };

  let { imageUrl } = prev;

  const imageFile = formData.get("image") as File;

  if (imageFile?.size) {
    const blob = await put(`categories/${Date.now()}-${imageFile.name}`, imageFile, {
      access: "public",
    });

    if (prev.imageUrl.includes("blob.vercel-storage.com")) {
      await del(prev.imageUrl).catch((): void => {});
    }

    imageUrl = blob.url;
  }

  const updated: TProductCategory = {
    ...prev,
    imageUrl,
    sortOrder,
    title,
  };

  const allCategories = await store.categories.getAll();
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

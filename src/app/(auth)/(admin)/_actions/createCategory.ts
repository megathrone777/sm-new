"use server";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const createCategory = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const title = `${formData.get("title") ?? ""}`.trim();

  if (!title) return { message: "Title is required", type: "error" };

  const sortOrder = +formData.get("sortOrder")!;
  const existing = await store.categories.getAll();
  const realCategories = existing.filter(({ id }: TProductCategory): boolean => id !== 0);
  const id = realCategories.length ? Math.max(...realCategories.map(({ id }) => id)) + 1 : 1;
  let imageUrl = "";
  const imageFile = formData.get("image") as File;

  if (imageFile?.size) {
    const blob = await put(`categories/${Date.now()}-${imageFile.name}`, imageFile, {
      access: "public",
    });

    imageUrl = blob.url;
  }

  const category: TProductCategory = {
    id,
    imageUrl,
    isPromotionActive: false,
    products: [],
    promotionDiscountAmount: 0,
    promotionForEveryXProducts: 0,
    sortOrder,
    title,
  };

  await store.categories.set(category);

  revalidatePath("/admin/categories");

  return { message: `Category "${title}" created`, type: "success" };
};

export { createCategory };

"use server";
import fs from "fs/promises";
import path from "path";

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
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `${Date.now()}${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", "categories", filename);

    await fs.writeFile(filePath, Buffer.from(await imageFile.arrayBuffer()));
    imageUrl = `/uploads/categories/${filename}`;
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

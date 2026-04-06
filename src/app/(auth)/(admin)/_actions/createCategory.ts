"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { authHelpers, productsHelpers } from "@/helpers";
import { redis } from "@/lib";

const createCategory = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const title = (formData.get("title") as string).trim();

  if (!title) return { message: "Title is required", type: "error" };

  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  const existing = await productsHelpers.getCategories();
  const realCategories = existing.filter(({ id }) => id !== 0);
  const id = realCategories.length
    ? Math.max(...realCategories.map(({ id }) => id)) + 1
    : 1;

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

  await redis.hset("categories", { [id]: JSON.stringify(category) });

  revalidatePath("/admin/categories");

  return { message: `Category "${title}" created`, type: "success" };
};

export { createCategory };

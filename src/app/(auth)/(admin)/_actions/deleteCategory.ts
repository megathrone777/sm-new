"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { redis } from "@/lib";

const deleteCategory = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const raw = await redis.hget("categories", id);

  if (raw) {
    const category: TProductCategory = typeof raw === "string" ? JSON.parse(raw) : raw;

    if (category.imageUrl) {
      const filePath = path.join(process.cwd(), "public", category.imageUrl);

      await fs.unlink(filePath).catch(() => {});
    }
  }

  await redis.hdel("categories", id);
  revalidatePath("/admin/categories");

  return { message: `"${title}" deleted successfully.`, type: "success" };
};

export { deleteCategory };

"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteCategory = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = await store.categories.popById(+id);

  if (category?.imageUrl) {
    const filePath = path.join(process.cwd(), "public", category.imageUrl);

    await fs.unlink(filePath).catch(() => {});
  }

  revalidatePath("/admin/categories");

  return { message: `"${title}" deleted successfully.`, type: "success" };
};

export { deleteCategory };

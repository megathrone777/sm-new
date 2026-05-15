"use server";
import { del } from "@vercel/blob";
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

  if (category?.imageUrl.includes("blob.vercel-storage.com")) {
    await del(category.imageUrl).catch((): void => {});
  }

  revalidatePath("/admin/categories");

  return { message: `"${title}" deleted successfully.`, type: "success" };
};

export { deleteCategory };

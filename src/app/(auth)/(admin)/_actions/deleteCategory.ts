"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
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

  await redis.hdel("categories", id);

  revalidatePath("/admin/categories");

  return { message: `"${title}" deleted successfully.`, type: "success" };
};

export { deleteCategory };

"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteAdditional = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = formData.get("id");
  const title = formData.get("title");

  await store.additionals.delete(+id!);
  revalidatePath("/admin/additionals");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteAdditional };

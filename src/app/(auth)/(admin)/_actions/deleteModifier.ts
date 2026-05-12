"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteModifier = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const id = formData.get("id") as string;
  const title = `${formData.get("title") ?? ""}`.trim();

  await store.modifiers.delete(+id);
  revalidatePath("/admin/modifiers");

  return {
    message: `Modifier "${title}" successfully deleted`,
    type: "success",
  };
};

export { deleteModifier };

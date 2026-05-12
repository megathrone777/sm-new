"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteSubmodifier = async (
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

  await store.submodifiers.delete(+id);
  revalidatePath("/admin/submodifiers");
  revalidatePath("/admin/modifiers");

  return {
    message: `SubModifier #${id} successfully deleted`,
    type: "success",
  };
};

export { deleteSubmodifier };

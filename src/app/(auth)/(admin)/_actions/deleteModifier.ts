"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { modifiersStore } from "@/store";

const deleteModifier = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const id = formData.get("id") as string;
  const title = (formData.get("title") as string).trim();

  await modifiersStore.delete(id);
  revalidatePath("/admin/modifiers");

  return {
    message: `Modifier "${title}" successfully deleted`,
    type: "success",
  };
};

export { deleteModifier };

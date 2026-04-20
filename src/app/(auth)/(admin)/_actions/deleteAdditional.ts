"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { additionalsStore } from "@/store";

const deleteAdditional = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = formData.get("id");
  const title = formData.get("title");

  await additionalsStore.delete(String(id));

  revalidatePath("/admin/additionals");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteAdditional };

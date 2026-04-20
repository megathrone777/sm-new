"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { promocodesStore } from "@/store";

const deletePromocode = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const code = (formData.get("code") as string).trim().toUpperCase();

  if (!code) {
    return { message: "Code is required", type: "error" };
  }

  await promocodesStore.delete(code);

  revalidatePath("/admin/promocodes");

  return { message: `Promocode ${code} successfully deleted`, type: "success" };
};

export { deletePromocode };

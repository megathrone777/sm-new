"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deletePromocode = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const code = `${formData.get("code") ?? ""}`.trim().toUpperCase();

  if (!code) {
    return { message: "Code is required", type: "error" };
  }

  await store.promocodes.delete(code);

  revalidatePath("/admin/promocodes");

  return { message: `Promocode ${code} successfully deleted`, type: "success" };
};

export { deletePromocode };

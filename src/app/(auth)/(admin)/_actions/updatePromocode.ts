"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updatePromocode = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const code = `${formData.get("code") ?? ""}`.trim().toUpperCase();
  const discount = +formData.get("discount")!;
  const type: TPromoCode["type"] = formData.get("oneTime") !== null ? "oneTime" : "reusable";
  const activatedAt = (formData.get("activatedAt") as string) || null;
  const isActive = formData.get("isActive") === "true";

  if (!code || !discount) {
    return { message: "Code and discount are required", type: "error" };
  }

  const existing = await store.promocodes.getByCode(code);

  if (!existing) {
    return { message: `Promocode ${code} not found`, type: "error" };
  }

  await store.promocodes.update(code, {
    activatedAt: activatedAt ?? "",
    discount,
    isActive: isActive ? "1" : "0",
    type,
  });

  revalidatePath("/admin/promocodes");

  return { message: `Promocode ${code} successfully updated`, type: "success" };
};

export { updatePromocode };

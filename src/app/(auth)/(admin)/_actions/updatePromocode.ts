"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { promocodesHelpers } from "@/helpers/promocodes";
import { promocodesStore } from "@/store";

const updatePromocode = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const code = (formData.get("code") as string).trim().toUpperCase();
  const discount = Number(formData.get("discount"));
  const type = formData.get("type") as TPromoCode["type"];
  const activatedAt = (formData.get("activatedAt") as string) || null;
  const isActive = formData.get("isActive") === "true";

  if (!code || !discount) {
    return { message: "Code and discount are required", type: "error" };
  }

  const existing = await promocodesHelpers.getPromocodeByCode(code);

  if (!existing) {
    return { message: `Promocode ${code} not found`, type: "error" };
  }

  await promocodesStore.update(code, {
    activatedAt: activatedAt ?? "",
    discount,
    isActive: isActive ? "1" : "0",
    type,
  });

  revalidatePath("/admin/promocodes");

  return { message: `Promocode ${code} successfully updated`, type: "success" };
};

export { updatePromocode };

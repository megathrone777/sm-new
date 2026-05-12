"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const createPromocode = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const code = `${formData.get("code")}`.trim().toUpperCase();
  const discount = +(formData.get("discount") ?? 0);
  const type = formData.get("type") as TPromoCode["type"];
  const activatedAt = `${formData.get("activatedAt") ?? ""}`;

  if (!code || !discount) {
    return { message: "Code and discount are required", type: "error" };
  }

  const existing = await store.promocodes.getByCode(code);

  if (existing) {
    return { message: `Promocode ${code} already exists`, type: "error" };
  }

  const promocode: TPromoCode = {
    activatedAt,
    appliedCount: 0,
    code,
    discount,
    id: Date.now(),
    isActive: !activatedAt || new Date() >= new Date(activatedAt),
    isLimitedBySchedule: false,
    orderIds: [],
    type: type || "reusable",
    usability: "",
  };

  await store.promocodes.set(promocode);
  revalidatePath("/admin/promocodes");

  return { message: `Promocode ${code} successfully created`, type: "success" };
};

export { createPromocode };

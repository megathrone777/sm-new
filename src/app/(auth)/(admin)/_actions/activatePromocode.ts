"use server";
import { revalidatePath } from "next/cache";

import { authHelpers, promocodesHelpers } from "@/helpers";
import { redis } from "@/lib";

/**
 * Schedules or immediately activates a promocode.
 * If activatedAt is a future datetime, the promo becomes active only after that moment.
 * If activatedAt is empty or in the past, the promo activates immediately.
 */
const activatePromocode = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const code = (formData.get("code") as string).trim().toUpperCase();
  const activatedAt = (formData.get("activatedAt") as string) || null;

  if (!code) {
    return { message: "Code is required", type: "error" };
  }

  const existing = await promocodesHelpers.getPromocodeByCode(code);

  if (!existing) {
    return { message: `Promocode ${code} not found`, type: "error" };
  }

  await redis.hset(`promocode:${code}`, {
    activatedAt: activatedAt ?? "",
    isActive: "1",
  });

  revalidatePath("/admin/promocodes");

  const isScheduled = activatedAt && new Date(activatedAt) > new Date();
  const message = isScheduled
    ? `Promocode ${code} scheduled for ${new Date(activatedAt!).toLocaleString()}`
    : `Promocode ${code} is now active`;

  return { message, type: "success" };
};

export { activatePromocode };

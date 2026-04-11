"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { promocodesHelpers } from "@/helpers/promocodes";
import { redis } from "@/lib";

const createPromocode = async (
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
  const activatedAt = (formData.get("activatedAt") as string) || "";

  if (!code || !discount) {
    return { message: "Code and discount are required", type: "error" };
  }

  const existing = await promocodesHelpers.getPromocodeByCode(code);

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

  const pipeline = redis.pipeline();

  pipeline.hset(`promocode:${code}`, {
    activatedAt: promocode.activatedAt ?? "",
    appliedCount: promocode.appliedCount,
    code: promocode.code,
    discount: promocode.discount,
    id: promocode.id,
    isActive: promocode.isActive ? "1" : "0",
    isLimitedBySchedule: "0",
    type: promocode.type,
    usability: promocode.usability ?? "",
  });
  pipeline.zadd("promocodes", { member: code, score: Date.now() });
  await pipeline.exec();

  revalidatePath("/admin/promocodes");

  return { message: `Promocode ${code} successfully created`, type: "success" };
};

export { createPromocode };

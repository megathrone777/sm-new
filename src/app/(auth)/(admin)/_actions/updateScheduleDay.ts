"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";
import { WEEK_DAYS } from "@/store/shop";

const TIME_REGEX = /^\d{2}:\d{2}$/;

const updateScheduleDay = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const day = `${formData.get("day") ?? ""}` as TWeekDay;

  if (!WEEK_DAYS.includes(day)) {
    return { message: "Invalid day", type: "error" };
  }

  const openTime = `${formData.get("openTime") ?? ""}`.trim();
  const closeTime = `${formData.get("closeTime") ?? ""}`.trim();
  const lastTimeForDelivery = `${formData.get("lastTimeForDelivery") ?? ""}`.trim();

  for (const value of [openTime, closeTime, lastTimeForDelivery]) {
    if (!TIME_REGEX.test(value)) {
      return { message: "Times must be in HH:mm format", type: "error" };
    }
  }

  if (openTime >= closeTime) {
    return { message: "Open time must be before close time", type: "error" };
  }

  if (lastTimeForDelivery > closeTime) {
    return { message: "Last delivery time cannot be after close time", type: "error" };
  }

  await store.shop.setScheduleDay(day, { closeTime, lastTimeForDelivery, openTime });
  revalidatePath("/admin/settings");
  revalidatePath("/cart");

  return { message: `${day} schedule updated`, type: "success" };
};

export { updateScheduleDay };

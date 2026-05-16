"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateSettings = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const address = `${formData.get("address") ?? ""}`.trim();
  const businessName = `${formData.get("businessName") ?? ""}`.trim();
  const closedByOverloadText = `${formData.get("closedByOverloadText") ?? ""}`.trim();
  const closedByOverloadTitle = `${formData.get("closedByOverloadTitle") ?? ""}`.trim();
  const closedByScheduleText = `${formData.get("closedByScheduleText") ?? ""}`.trim();
  const closedByScheduleTitle = `${formData.get("closedByScheduleTitle") ?? ""}`.trim();
  const companyDetails = `${formData.get("companyDetails") ?? ""}`.trim();
  const cutleryPriceRaw = `${formData.get("cutleryPrice") ?? ""}`.trim();
  const email = `${formData.get("email") ?? ""}`.trim();
  const lastTimeForPickup = `${formData.get("lastTimeForPickup") ?? ""}`.trim();
  const mapUrl = `${formData.get("mapUrl") ?? ""}`.trim();
  const phone = `${formData.get("phone") ?? ""}`.trim();
  const title = `${formData.get("title") ?? ""}`.trim();
  const isAvailable = formData.has("isAvailable");

  if (!title) return { message: "Title is required", type: "error" };
  if (!cutleryPriceRaw || Number.isNaN(+cutleryPriceRaw)) {
    return { message: "Cutlery price must be a number", type: "error" };
  }

  await store.shop.setSettings({
    address,
    businessName,
    closedByOverloadText,
    closedByOverloadTitle,
    closedByScheduleText,
    closedByScheduleTitle,
    companyDetails,
    cutleryPrice: +cutleryPriceRaw,
    email,
    isAvailable,
    lastTimeForPickup,
    mapUrl,
    phone,
    title,
  });
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");

  return { message: "Settings updated", type: "success" };
};

export { updateSettings };

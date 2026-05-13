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
  const companyDetails = `${formData.get("companyDetails") ?? ""}`.trim();
  const cutleryPriceRaw = `${formData.get("cutleryPrice") ?? ""}`.trim();
  const email = `${formData.get("email") ?? ""}`.trim();
  const lastTimeForPickup = `${formData.get("lastTimeForPickup") ?? ""}`.trim();
  const phone = `${formData.get("phone") ?? ""}`.trim();
  const title = `${formData.get("title") ?? ""}`.trim();
  const isAvailable = formData.get("isAvailable") === "on";
  const isOpened = formData.get("isOpened") === "on";

  if (!title) return { message: "Title is required", type: "error" };
  if (!cutleryPriceRaw || Number.isNaN(+cutleryPriceRaw)) {
    return { message: "Cutlery price must be a number", type: "error" };
  }

  await store.shop.setSettings({
    address,
    businessName,
    companyDetails,
    cutleryPrice: +cutleryPriceRaw,
    email,
    isAvailable,
    isOpened,
    lastTimeForPickup,
    phone,
    title,
  });
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");

  return { message: "Settings updated", type: "success" };
};

export { updateSettings };

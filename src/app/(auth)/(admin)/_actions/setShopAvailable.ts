"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const setShopAvailable = async (isAvailable: boolean): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  await store.shop.setSettings({ isAvailable });
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");

  return {
    message: isAvailable ? "Shop is now available" : "Shop is now unavailable",
    type: "success",
  };
};

export { setShopAvailable };

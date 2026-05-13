"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const updateDeliveryTime = async (formData: FormData): Promise<void> => {
  const time = `${formData.get("time") ?? ""}`.trim();
  const cart = await store.cart.get();

  if (!cart) return;

  await saveCart({
    time: { label: time, value: time || null },
  });
  revalidatePath("/cart");
};

export { updateDeliveryTime };

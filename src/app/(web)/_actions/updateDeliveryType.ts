"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const updateDeliveryType = async (formData: FormData): Promise<void> => {
  const type = formData.get("deliveryType") as null | TDeliveryType;

  if (!type) return;

  const delivery = await store.cart.getDelivery();

  if (!delivery || delivery.type === type) return;

  await saveCart({
    delivery: { ...delivery, type },
  });
  revalidatePath("/cart");
};

export { updateDeliveryType };

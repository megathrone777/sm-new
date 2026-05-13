"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const resetDeliveryAddress = async (): Promise<void> => {
  const cart = await store.cart.get();

  if (!cart) return;

  const { addressFormat: _af, addressRange: _ar, delivery: _d, ...errors } = cart.errors;

  await saveCart({
    delivery: {
      ...cart.delivery,
      address: "",
      distanceInM: 0,
      position: null,
      price: null,
      title: "",
    },
    errors,
  });

  revalidatePath("/cart");
};

export { resetDeliveryAddress };

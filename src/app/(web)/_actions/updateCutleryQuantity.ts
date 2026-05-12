"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const updateCutleryQuantity = async (type: "decrease" | "increase"): Promise<void> => {
  const sessionId = await store.cart.getSessionId();

  if (!sessionId) return;

  const locked = await store.cart.lock(sessionId);

  if (!locked) return;

  try {
    const cart = await store.cart.get();

    if (!cart) return;

    const { cutlery: _, ...errors } = cart.errors;
    const quantity =
      type === "increase" ? cart.cutlery.quantity + 1 : Math.max(0, cart.cutlery.quantity - 1);

    await saveCart({
      cutlery: {
        ...cart.cutlery,
        quantity,
      },
      errors,
    });
    revalidatePath("/cart");
  } finally {
    await store.cart.unlock(sessionId);
  }
};

export { updateCutleryQuantity };

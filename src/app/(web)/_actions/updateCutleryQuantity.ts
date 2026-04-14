"use server";
import { revalidatePath } from "next/cache";

import { cartHelpers } from "@/helpers/cart";

import { lock, release } from "./cartLock";
import { saveCart } from "./saveCart";

const updateCutleryQuantity = async (type: "decrease" | "increase"): Promise<void> => {
  const sessionId = await cartHelpers.getSessionId();

  if (!sessionId) return;

  const locked = await lock(sessionId);

  if (!locked) return;

  try {
    const cart = await cartHelpers.getCart();

    if (!cart) return;

    const quantity =
      type === "increase" ? cart.cutlery.quantity + 1 : Math.max(0, cart.cutlery.quantity - 1);

    await saveCart({
      ...cart,
      cutlery: {
        ...cart.cutlery,
        quantity,
      },
      errors: {
        ...cart.errors,
        cutlery: undefined,
      },
    });
    revalidatePath("/cart");
  } finally {
    await release(sessionId);
  }
};

export { updateCutleryQuantity };

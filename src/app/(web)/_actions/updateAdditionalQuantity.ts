"use server";
import { revalidatePath } from "next/cache";

import { additionalsHelpers } from "@/helpers/additionals";
import { cartHelpers } from "@/helpers/cart";

import { lock, release } from "./cartLock";
import { saveCart } from "./saveCart";

const updateAdditionalQuantity = async (
  id: number,
  type: "decrease" | "increase",
): Promise<void> => {
  const sessionId = await cartHelpers.getSessionId();

  if (!sessionId) return;

  const locked = await lock(sessionId);

  if (!locked) return;

  try {
    const cart = await cartHelpers.getCart();

    if (!cart) return;

    const newCart: TCart = { ...cart, additionals: [...cart.additionals] };
    const existingIndex = newCart.additionals.findIndex(
      (a: TCartAdditional): boolean => a.id === id,
    );
    const existing = newCart.additionals[existingIndex];

    if (type === "increase") {
      if (existing) {
        newCart.additionals[existingIndex] = {
          ...existing,
          quantity: existing.quantity + 1,
          totalPrice: existing.totalPrice + existing.price,
        };
      } else {
        const additional = await additionalsHelpers.getAdditionalById(id);

        if (!additional) return;
        newCart.additionals.push({ ...additional, quantity: 1, totalPrice: additional.price });
      }
    } else {
      if (!existing) return;
      if (existing.quantity <= 1) {
        newCart.additionals.splice(existingIndex, 1);
      } else {
        newCart.additionals[existingIndex] = {
          ...existing,
          quantity: existing.quantity - 1,
          totalPrice: existing.totalPrice - existing.price,
        };
      }
    }

    await saveCart(newCart);
    revalidatePath("/cart");
  } finally {
    await release(sessionId);
  }
};

export { updateAdditionalQuantity };

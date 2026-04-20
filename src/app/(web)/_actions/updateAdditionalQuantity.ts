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

    const additionals = [...cart.additionals];
    const existingIndex = additionals.findIndex((a: TCartAdditional): boolean => a.id === id);
    const existing = additionals[existingIndex];

    if (type === "increase") {
      if (existing) {
        additionals[existingIndex] = {
          ...existing,
          quantity: existing.quantity + 1,
          totalPrice: existing.totalPrice + existing.price,
        };
      } else {
        const additional = await additionalsHelpers.getAdditionalById(id);

        if (!additional) return;
        additionals.push({ ...additional, quantity: 1, totalPrice: additional.price });
      }
    } else {
      if (!existing) return;
      if (existing.quantity <= 1) {
        additionals.splice(existingIndex, 1);
      } else {
        additionals[existingIndex] = {
          ...existing,
          quantity: existing.quantity - 1,
          totalPrice: existing.totalPrice - existing.price,
        };
      }
    }

    await saveCart({ additionals });
    revalidatePath("/cart");
  } finally {
    await release(sessionId);
  }
};

export { updateAdditionalQuantity };

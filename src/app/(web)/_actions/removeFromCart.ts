"use server";
import { revalidatePath } from "next/cache";

import { cartHelpers } from "@/helpers/cart";

import { clearCart } from "./clearCart";
import { saveCart } from "./saveCart";

const removeFromCart = async (index: number): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;
  const products = [...cart.products];

  products.splice(index, 1);

  if (products.length === 0) {
    await clearCart();

    return;
  }

  await saveCart({ products });
  revalidatePath("/cart");
};

export { removeFromCart };

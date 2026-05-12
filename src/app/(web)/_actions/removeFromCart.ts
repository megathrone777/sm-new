"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { clearCart } from "./clearCart";
import { saveCart } from "./saveCart";

const removeFromCart = async (index: number): Promise<void> => {
  const cart = await store.cart.get();

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

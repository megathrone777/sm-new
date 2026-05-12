"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const updateQuantity = async (index: number, type: "decrease" | "increase"): Promise<void> => {
  const sessionId = await store.cart.getSessionId();

  if (!sessionId) return;

  const locked = await store.cart.lock(sessionId);

  if (!locked) return;

  try {
    const cart = await store.cart.get();

    if (!cart) return;

    const products = [...cart.products];
    const product = products[index];

    if (!product) return;

    const unitPrice = product.totalPrice / product.quantity;

    if (type === "decrease") {
      if (product.quantity <= 1) {
        products.splice(index, 1);
      } else {
        products[index] = {
          ...product,
          quantity: product.quantity - 1,
          totalPrice: product.totalPrice - unitPrice,
        };
      }
    } else {
      products[index] = {
        ...product,
        quantity: product.quantity + 1,
        totalPrice: product.totalPrice + unitPrice,
      };
    }

    await saveCart({ products });
    revalidatePath("/cart");
  } finally {
    await store.cart.unlock(sessionId);
  }
};

export { updateQuantity };

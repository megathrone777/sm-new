"use server";

import { cartHelpers } from "@/helpers/cart";

import { clearCart } from "./clearCart";
import { saveCart } from "./saveCart";

const removeFromCart = async (index: number): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;
  const newCart: TCart = { ...cart, products: [...cart.products] };

  newCart.products.splice(index, 1);

  if (newCart.products.length === 0) {
    await clearCart();

    return;
  }

  await saveCart(newCart);
};

export { removeFromCart };

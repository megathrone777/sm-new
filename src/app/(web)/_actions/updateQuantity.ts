"use server";
import { cartHelpers } from "@/helpers/cart";

import { saveCart } from "./saveCart";

const updateQuantity = async (index: number, type: "decrease" | "increase"): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;
  const newCart: TCart = { ...cart, products: [...cart.products] };
  const product = newCart.products[index];

  if (!product) return;
  const unitPrice = product.totalPrice / product.quantity;

  if (type === "decrease") {
    if (product.quantity <= 1) {
      newCart.products.splice(index, 1);
    } else {
      newCart.products[index] = {
        ...product,
        quantity: product.quantity - 1,
        totalPrice: product.totalPrice - unitPrice,
      };
    }
  } else {
    newCart.products[index] = {
      ...product,
      quantity: product.quantity + 1,
      totalPrice: product.totalPrice + unitPrice,
    };
  }

  await saveCart(newCart);
};

export { updateQuantity };

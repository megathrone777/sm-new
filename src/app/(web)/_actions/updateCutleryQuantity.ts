"use server";
import { cartHelpers } from "@/helpers/cart";

import { saveCart } from "./saveCart";

const updateCutleryQuantity = async (type: "decrease" | "increase"): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;

  const cutleryCount =
    type === "increase" ? cart.cutleryCount + 1 : Math.max(0, cart.cutleryCount - 1);

  await saveCart({ ...cart, cutleryCount });
};

export { updateCutleryQuantity };

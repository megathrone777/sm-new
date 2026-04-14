"use server";
import { revalidatePath } from "next/cache";

import { cartHelpers } from "@/helpers/cart";

import { saveCart } from "./saveCart";

const savePhoneToCart = async (phoneNumber: string): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;

  await saveCart({
    ...cart,
    client: {
      ...cart.client,
      phoneNumber,
    },
  });
  revalidatePath(`/archived-orders/${phoneNumber.replace("+", "")}`);
};

export { savePhoneToCart };

"use server";
import { revalidatePath } from "next/cache";

import { cartHelpers } from "@/helpers/cart";

import { saveCart } from "./saveCart";

const updatePhone = async (phoneNumber: string): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;
  const isPhoneValid = /^\+\d{7,15}$/.test(phoneNumber);

  await saveCart({
    client: {
      ...cart.client,
      phoneNumber: isPhoneValid ? phoneNumber.replace("+", "") : cart.client.phoneNumber,
    },
    errors: {
      ...cart.errors,
      phone: undefined,
    },
  });

  if (isPhoneValid) {
    revalidatePath(`/archived-orders/${phoneNumber.replace("+", "")}`);
  }
};

export { updatePhone };

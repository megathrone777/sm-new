"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const updatePhone = async (phoneNumber: string): Promise<void> => {
  const cart = await store.cart.get();

  if (!cart) return;
  const isPhoneValid = /^\+\d{7,15}$/.test(phoneNumber);
  const { phone: _, ...errors } = cart.errors;

  await saveCart({
    client: {
      ...cart.client,
      phoneNumber: isPhoneValid ? phoneNumber.replace("+", "") : cart.client.phoneNumber,
    },
    errors,
  });

  if (isPhoneValid) {
    revalidatePath("/cart");
    revalidatePath(`/archived-orders/${phoneNumber.replace("+", "")}`);
  }
};

export { updatePhone };

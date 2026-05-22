"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const clearPromoError = async (): Promise<void> => {
  const cart = await store.cart.get();

  if (!cart?.errors.promo) return;

  const { promo: _, ...errors } = cart.errors;

  await saveCart({ errors });
  revalidatePath("/cart");
};

export { clearPromoError };

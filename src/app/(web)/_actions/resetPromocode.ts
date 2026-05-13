"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const resetPromocode = async (): Promise<void> => {
  const cart = await store.cart.get();

  if (!cart) return;

  const { promo: _, ...errors } = cart.errors;

  await saveCart({
    errors,
    promo: { code: "", discount: 0 },
  });
  revalidatePath("/cart");
};

export { resetPromocode };

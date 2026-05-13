"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const VALID_TYPES: TPaymentType[] = ["card", "cardAfterDelivery", "cash"];

const updatePaymentType = async (formData: FormData): Promise<void> => {
  const type = `${formData.get("payment") ?? ""}` as TPaymentType;

  if (!VALID_TYPES.includes(type)) return;
  const cart = await store.cart.get();

  if (!cart || cart.payment.type === type) return;

  await saveCart({
    payment: {
      change: type === "cash" ? cart.payment.change : null,
      type,
    },
  });
  revalidatePath("/cart");
};

export { updatePaymentType };

"use server";
import { revalidatePath } from "next/cache";

import { cartHelpers } from "@/helpers/cart";

import { saveCart } from "./saveCart";

const updateClient = async (formData: FormData): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;

  await saveCart({
    ...cart,
    client: {
      ...cart.client,
      ...client,
    },
  });
  revalidatePath("/cart");
  // revalidatePath(`/archived-orders/${phoneNumber.replace("+", "")}`);
};

export { updateClient };

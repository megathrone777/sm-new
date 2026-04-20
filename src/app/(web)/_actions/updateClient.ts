"use server";
import { revalidatePath } from "next/cache";

import { cartHelpers } from "@/helpers/cart";

import { saveCart } from "./saveCart";

const updateClient = async (formData: FormData): Promise<void> => {
  const cart = await cartHelpers.getCart();

  if (!cart) return;
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");

  await saveCart({
    client: {
      ...cart.client,
      email,
      name,
    },
    errors: {
      ...cart.errors,
      email: undefined,
      name: undefined,
    },
  });
  revalidatePath("/cart");
};

export { updateClient };

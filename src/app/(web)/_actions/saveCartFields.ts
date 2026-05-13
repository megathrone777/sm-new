"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const saveCartFields = async (formData: FormData): Promise<void> => {
  const cart = await store.cart.get();

  if (!cart) return;

  const name = `${formData.get("name") ?? ""}`.trim();
  const email = `${formData.get("email") ?? ""}`.trim();
  const phoneNumber = `${formData.get("phone") ?? ""}`.replace(/\D/g, "");
  const note = `${formData.get("note") ?? ""}`;

  const errors = { ...cart.errors };

  if (name) delete errors.name;
  if (email) delete errors.email;
  if (phoneNumber && /^\d{7,15}$/.test(phoneNumber)) delete errors.phone;

  await saveCart({
    client: { ...cart.client, email, name, phoneNumber },
    errors,
    note,
  });

  if (Object.keys(errors).length !== Object.keys(cart.errors).length) {
    revalidatePath("/cart");
  }
};

export { saveCartFields };

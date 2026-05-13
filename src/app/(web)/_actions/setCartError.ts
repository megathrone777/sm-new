"use server";
import { store } from "@/store";

import { saveCart } from "./saveCart";

type TFieldKey = "email" | "name" | "phone";

const VALID_FIELDS: TFieldKey[] = ["email", "name", "phone"];

const setCartError = async (field: string, message: string): Promise<void> => {
  if (!VALID_FIELDS.includes(field as TFieldKey)) return;

  const cart = await store.cart.get();

  if (!cart) return;

  const errors = { ...cart.errors };

  if (message) {
    errors[field as TFieldKey] = message;
  } else {
    delete errors[field as TFieldKey];
  }

  await saveCart({ errors });
};

export { setCartError };

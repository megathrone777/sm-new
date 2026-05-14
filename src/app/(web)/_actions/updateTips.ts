"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const VALID_PERCENTAGES: number[] = [0, 2, 5, 10, 15];

const updateTips = async (formData: FormData): Promise<void> => {
  const raw = `${formData.get("tips") ?? ""}`;
  const percentage = VALID_PERCENTAGES.includes(+raw) ? +raw : 0;
  const cart = await store.cart.get();

  if (!cart || cart.tips.percentage === percentage) return;
  await saveCart({
    tips: { percentage, price: 0 },
  });
  revalidatePath("/cart");
};

export { updateTips };

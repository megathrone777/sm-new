"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updatePromotion = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const col1Text = `${formData.get("col1Text") ?? ""}`.trim();
  const col2Text = `${formData.get("col2Text") ?? ""}`.trim();

  await store.promotion.set({ col1Text, col2Text });

  revalidatePath("/admin/promotion");
  revalidatePath("/", "layout");

  return { message: "Promotion updated", type: "success" };
};

export { updatePromotion };

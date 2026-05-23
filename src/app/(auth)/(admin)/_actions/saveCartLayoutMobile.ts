"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";
import type { TCartLayoutItem } from "@/store/cartLayout";

const saveCartLayoutMobile = async (layout: TCartLayoutItem[]): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  await store.cartLayout.setMobile(layout);
  revalidatePath("/cart");

  return { message: "Layout saved", type: "success" };
};

export { saveCartLayoutMobile };

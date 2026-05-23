"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import type { Layout } from "react-grid-layout";

const saveCartLayout = async (layout: Layout, isMobile: boolean): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  await (isMobile ? store.cartLayout.setMobile(layout) : store.cartLayout.set(layout));
  revalidatePath("/cart");

  return { message: "Layout saved", type: "success" };
};

const saveDesktopLayout = async (layout: Layout): Promise<TActionResult> =>
  saveCartLayout(layout, false);

const saveMobileLayout = async (layout: Layout): Promise<TActionResult> =>
  saveCartLayout(layout, true);

export { saveDesktopLayout, saveMobileLayout };

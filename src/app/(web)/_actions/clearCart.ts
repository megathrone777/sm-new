"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { store } from "@/store";

const COOKIE_NAME: string = "sid";

const clearCart = async (): Promise<void> => {
  const sessionId = await store.cart.getSessionId();

  if (sessionId) {
    await store.cart.delete(sessionId);
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME);
    revalidatePath("/", "layout");
  }
};

export { clearCart };

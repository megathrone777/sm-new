"use server";
import { refresh } from "next/cache";
import { cookies } from "next/headers";

import { cartHelpers } from "@/helpers/cart";
import { redis } from "@/lib";

const COOKIE_NAME: string = "sid";

const clearCart = async (): Promise<void> => {
  const sessionId = await cartHelpers.getSessionId();

  if (sessionId) {
    await redis.del(sessionId);
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME);
    refresh();
  }
};

export { clearCart };

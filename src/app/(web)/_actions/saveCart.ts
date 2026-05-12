"use server";
import { store } from "@/store";

const saveCart = async (patch: Partial<TCart>): Promise<void> => {
  const sessionId = await store.cart.getOrCreateSessionId();

  await store.cart.set(sessionId, patch);
};

export { saveCart };

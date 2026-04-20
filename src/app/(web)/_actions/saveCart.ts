"use server";
import { cartHelpers } from "@/helpers/cart";
import { store } from "@/store";

const saveCart = async (patch: Partial<TCart>): Promise<void> => {
  const sessionId = await cartHelpers.getSessionIdAndCreateIfMissing();

  await store.cart.set(sessionId, patch);
};

export { saveCart };

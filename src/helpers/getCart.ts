import { getOrCreateCartSessionId } from "@/helpers";
import { redis } from "@/lib";

const getCart = async (): Promise<null | TCart> => {
  const sessionId = await getOrCreateCartSessionId();

  if (sessionId) {
    const cart = await redis.hgetall<Record<string, TCart>>(sessionId);

    if (cart && cart[sessionId] && !!Object.keys(cart).length) {
      return cart[sessionId];
    }
  }

  return null;
};

export { getCart };

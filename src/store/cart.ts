import { redis } from "./redis";

const TTL_SECONDS = 60 * 60 * 24 * 7;
const LOCK_TTL_SECONDS = 5;

const lockKey = (sessionId: string): string => `lock:${sessionId}`;

const cartStore = {
  delete: async (sessionId: string): Promise<void> => {
    await redis.del(sessionId);
  },

  get: async (sessionId: string): Promise<null | TCart> => {
    const cart = await redis.hgetall<Record<string, unknown>>(sessionId);

    return cart && Object.keys(cart).length > 0 ? (cart as unknown as TCart) : null;
  },

  lock: async (sessionId: string, retries = 10, delayMs = 100): Promise<boolean> => {
    for (let i = 0; i < retries; i++) {
      const result = await redis.set(lockKey(sessionId), "1", { ex: LOCK_TTL_SECONDS, nx: true });

      if (result === "OK") return true;

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    return false;
  },

  set: async (sessionId: string, patch: Partial<TCart>): Promise<void> => {
    await redis.pipeline().hset(sessionId, patch).expire(sessionId, TTL_SECONDS).exec();
  },

  unlock: async (sessionId: string): Promise<void> => {
    await redis.del(lockKey(sessionId));
  },
};

export { cartStore };

import { redis } from "./redis";

const INDEX = "promocodes";

const hashKey = (code: string): string => `promocode:${code}`;
const ordersIndex = (code: string): string => `promocode:${code}:orders`;

const serializeFields = (
  promocode: Omit<TPromoCode, "orderIds">,
): Record<string, number | string> => ({
  activatedAt: promocode.activatedAt ?? "",
  appliedCount: promocode.appliedCount,
  code: promocode.code,
  discount: promocode.discount,
  id: promocode.id,
  isActive: promocode.isActive ? "1" : "0",
  isLimitedBySchedule: promocode.isLimitedBySchedule ? "1" : "0",
  type: promocode.type,
  usability: promocode.usability ?? "",
});

const promocodesStore = {
  delete: async (code: string): Promise<void> => {
    await redis.pipeline().del(hashKey(code)).del(ordersIndex(code)).zrem(INDEX, code).exec();
  },

  getAll: async (offset = 0, limit = 50): Promise<TPromoCode[]> => {
    const codes = await redis.zrange(INDEX, offset, offset + limit - 1, { rev: true });

    if (!codes?.length) return [];

    const pipeline = redis.pipeline();

    for (const code of codes) {
      pipeline.hgetall(hashKey(code as string));
    }

    const promocodes = await pipeline.exec<TPromoCode[]>();

    return promocodes.filter(Boolean);
  },

  getByCode: async (code: string): Promise<null | Record<string, TPromoCode>> => {
    return redis.hgetall<Record<string, TPromoCode>>(hashKey(code));
  },

  set: async (promocode: TPromoCode, score: number = Date.now()): Promise<void> => {
    await redis
      .pipeline()
      .hset(hashKey(promocode.code), serializeFields(promocode))
      .zadd(INDEX, { member: promocode.code, score })
      .exec();
  },

  update: async (code: string, patch: Record<string, number | string>): Promise<void> => {
    await redis.hset(hashKey(code), patch);
  },
};

export { promocodesStore };

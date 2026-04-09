import { redis } from "@/lib";

const getPromocodes = async (offset = 0, limit = 50): Promise<TPromoCode[]> => {
  const codes = await redis.zrange("promocodes", offset, offset + limit - 1, { rev: true });

  if (!codes || !codes.length) return [];

  const pipeline = redis.pipeline();

  for (const code of codes) {
    pipeline.hgetall(`promocode:${code}`);
  }

  const promocodes = await pipeline.exec<TPromoCode[]>();

  return promocodes.filter(Boolean);
};

export { getPromocodes };

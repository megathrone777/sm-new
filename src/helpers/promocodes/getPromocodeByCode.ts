import { redis } from "@/lib";

const getPromocodeByCode = async (code: string): Promise<null | Record<string, TPromoCode>> => {
  const promocode = await redis.hgetall<Record<string, TPromoCode>>(`promocode:${code}`);

  return promocode;
};

export { getPromocodeByCode };

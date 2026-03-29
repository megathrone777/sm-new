import { redis } from "@/lib";

const getProducts = async (): Promise<TProduct[]> => {
  const products = await redis.hgetall<Record<string, TProduct>>("products");

  if (!products) return [];

  return Object.values(products).sort(
    (productA: TProduct, productB: TProduct): number =>
      (productA.sortOrder ?? 0) - (productB.sortOrder ?? 0),
  );
};

export { getProducts };

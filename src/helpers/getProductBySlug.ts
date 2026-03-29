import { redis } from "@/lib";

const getProductBySlug = async (slug: string): Promise<null | TProduct> => {
  const product = await redis.hget<TProduct>("products", slug);

  if (product) return product;

  return null;
};

export { getProductBySlug };

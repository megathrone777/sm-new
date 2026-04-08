import { redis } from "@/lib";

const getCategoryById = async (id?: TProductCategory["id"]): Promise<null | TProductCategory> => {
  if (id === undefined || id === null) return null;
  const category = await redis.hget<TProductCategory>("categories", `${id}`);

  if (category) return category;

  return null;
};

export { getCategoryById };

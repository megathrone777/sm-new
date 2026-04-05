import { redis } from "@/lib";

const getAdditionalById = async (id: number): Promise<null | TAdditional> => {
  const additional = await redis.hget<TAdditional>("additionals", `${id}`);

  return additional ?? null;
};

export { getAdditionalById };

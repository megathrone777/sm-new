import { redis } from "@/lib";

const getSubmodifierById = async (id: number): Promise<null | TSubmodifier> => {
  const sub = await redis.hget<TSubmodifier>("submodifiers", String(id));

  return sub ?? null;
};

export { getSubmodifierById };

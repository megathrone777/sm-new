import { redis } from "@/lib";

const getModifierById = async (id: number): Promise<null | TModifier> => {
  const modifier = await redis.hget<TModifier>("modifiers", `${id}`);

  return modifier ?? null;
};

export { getModifierById };

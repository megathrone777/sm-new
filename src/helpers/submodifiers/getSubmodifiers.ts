import { redis } from "@/lib";

const getSubmodifiers = async (): Promise<TSubmodifier[]> => {
  const submodifiers = await redis.hgetall<Record<string, TSubmodifier>>("submodifiers");

  if (!submodifiers) return [];

  return Object.values(submodifiers).sort(
    (a: TSubmodifier, b: TSubmodifier): number => a.id - b.id,
  );
};

export { getSubmodifiers };

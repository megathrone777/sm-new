import { redis } from "@/lib";

const getAdditionals = async (): Promise<TAdditional[]> => {
  const additionals = await redis.hgetall<Record<string, TAdditional>>("additionals");

  if (!additionals) return [];

  return Object.values(additionals).sort(
    (a: TAdditional, b: TAdditional): number => a.sortOrder - b.sortOrder,
  );
};

export { getAdditionals };

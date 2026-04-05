import { redis } from "@/lib";

const getModifiers = async (): Promise<TModifier[]> => {
  const modifiers = await redis.hgetall<Record<string, TModifier>>("modifiers");

  if (!modifiers) return [];

  return Object.values(modifiers).sort(
    (modifierA: TModifier, modifierB: TModifier): number =>
      modifierA.sortOrder - modifierB.sortOrder,
  );
};

export { getModifiers };

import { redis } from "./redis";

const HASH = "submodifiers";

const submodifiersStore = {
  delete: async (id: TSubmodifier["id"] | string): Promise<void> => {
    await redis.hdel(HASH, String(id));
  },

  getAll: async (): Promise<TSubmodifier[]> => {
    const submodifiers = await redis.hgetall<Record<string, TSubmodifier>>(HASH);

    if (!submodifiers) return [];

    return Object.values(submodifiers).sort(
      (a: TSubmodifier, b: TSubmodifier): number => a.sortOrder - b.sortOrder,
    );
  },

  getById: async (id: TSubmodifier["id"]): Promise<null | TSubmodifier> => {
    return (await redis.hget<TSubmodifier>(HASH, String(id))) ?? null;
  },

  set: async (submodifier: TSubmodifier): Promise<void> => {
    await redis.hset(HASH, { [submodifier.id]: JSON.stringify(submodifier) });
  },
};

export { submodifiersStore };

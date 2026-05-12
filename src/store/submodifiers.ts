import { sortByOrder } from "@/utils";

import { redis } from "./redis";

const HASH = "submodifiers";

const submodifiers = {
  delete: async (id: TSubmodifier["id"]): Promise<void> => {
    await redis.hdel(HASH, `${id}`);
  },

  getAll: async (): Promise<TSubmodifier[]> => {
    const submodifiers = await redis.hgetall<Record<string, TSubmodifier>>(HASH);

    if (!submodifiers) return [];

    return sortByOrder<TSubmodifier>(Object.values(submodifiers));
  },

  getById: async (id: TSubmodifier["id"]): Promise<null | TSubmodifier> => {
    return (await redis.hget<TSubmodifier>(HASH, `${id}`)) ?? null;
  },

  set: async (submodifier: TSubmodifier): Promise<void> => {
    await redis.hset(HASH, { [submodifier.id]: JSON.stringify(submodifier) });
  },
};

export { submodifiers };

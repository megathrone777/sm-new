import { sortByOrder } from "@/utils";

import { redis } from "./redis";

const HASH = "additionals";

const additionals = {
  create: async (additional: TAdditional): Promise<void> => {
    await redis.hset(HASH, { [additional.id]: JSON.stringify(additional) });
  },

  delete: async (id: TAdditional["id"]): Promise<void> => {
    await redis.hdel(HASH, `${id}`);
  },

  getAll: async (): Promise<TAdditional[]> => {
    const additionals = await redis.hgetall<Record<string, TAdditional>>(HASH);

    if (!additionals) return [];

    return sortByOrder<TAdditional>(Object.values(additionals));
  },

  getById: async (id: TAdditional["id"]): Promise<null | TAdditional> => {
    return (await redis.hget<TAdditional>(HASH, `${id}`)) ?? null;
  },
};

export { additionals };

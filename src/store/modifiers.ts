import { sortByOrder } from "@/utils";

import { redis } from "./redis";

const HASH = "modifiers";
const SEARCH_PREFIX = "modifier:";

type TModifierSearchEntry = Pick<TModifier, "id" | "price" | "title">;

const modifiers = {
  delete: async (id: TModifier["id"]): Promise<void> => {
    await redis.pipeline().hdel(HASH, `${id}`).del(`${SEARCH_PREFIX}${id}`).exec();
  },

  getAll: async (): Promise<TModifier[]> => {
    const modifiers = await redis.hgetall<Record<string, TModifier>>(HASH);

    if (!modifiers) return [];

    return sortByOrder<TModifier>(Object.values(modifiers));
  },

  getById: async (id: TModifier["id"]): Promise<null | TModifier> => {
    return (await redis.hget<TModifier>(HASH, `${id}`)) ?? null;
  },

  set: async (modifier: TModifier): Promise<void> => {
    const searchEntry: TModifierSearchEntry = {
      id: modifier.id,
      price: modifier.price,
      title: modifier.title,
    };

    await redis
      .pipeline()
      .hset(HASH, { [modifier.id]: JSON.stringify(modifier) })
      .hset(`${SEARCH_PREFIX}${modifier.id}`, searchEntry)
      .exec();
  },
};

export { modifiers };

import { redis } from "./redis";

const HASH = "modifiers";
const SEARCH_PREFIX = "modifier:";

type TModifierSearchEntry = Pick<TModifier, "id" | "price" | "title">;

const modifiersStore = {
  delete: async (id: TModifier["id"] | string): Promise<void> => {
    await redis
      .pipeline()
      .hdel(HASH, String(id))
      .del(`${SEARCH_PREFIX}${id}`)
      .exec();
  },

  getAll: async (): Promise<TModifier[]> => {
    const modifiers = await redis.hgetall<Record<string, TModifier>>(HASH);

    if (!modifiers) return [];

    return Object.values(modifiers).sort(
      (a: TModifier, b: TModifier): number => a.sortOrder - b.sortOrder,
    );
  },

  getById: async (id: TModifier["id"]): Promise<null | TModifier> => {
    return (await redis.hget<TModifier>(HASH, String(id))) ?? null;
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

export { modifiersStore };

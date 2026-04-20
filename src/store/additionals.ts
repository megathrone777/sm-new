import { redis } from "./redis";

const HASH = "additionals";

const additionalsStore = {
  delete: async (id: TAdditional["id"] | string): Promise<void> => {
    await redis.hdel(HASH, String(id));
  },

  getAll: async (): Promise<TAdditional[]> => {
    const additionals = await redis.hgetall<Record<string, TAdditional>>(HASH);

    if (!additionals) return [];

    return Object.values(additionals).sort(
      (a: TAdditional, b: TAdditional): number => a.sortOrder - b.sortOrder,
    );
  },

  getById: async (id: TAdditional["id"]): Promise<null | TAdditional> => {
    return (await redis.hget<TAdditional>(HASH, String(id))) ?? null;
  },

  set: async (additional: TAdditional): Promise<void> => {
    await redis.hset(HASH, { [additional.id]: JSON.stringify(additional) });
  },
};

export { additionalsStore };

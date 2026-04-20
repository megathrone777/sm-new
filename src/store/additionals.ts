import { redis } from "./";

const HASH = "additionals";

const additionals = {
  create: async (additional: TAdditional): Promise<void> => {
    await redis.hset(HASH, { [additional.id]: JSON.stringify(additional) });
  },

  delete: async (id: string | TAdditional["id"]): Promise<void> => {
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
};

export { additionals };

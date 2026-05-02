import { redis } from "./redis";

const HASH = "categories";

const categoriesStore = {
  delete: async (id: string | TProductCategory["id"]): Promise<void> => {
    await redis.hdel(HASH, String(id));
  },

  getAllRaw: async (): Promise<null | Record<string, TProductCategory>> => {
    return redis.hgetall<Record<string, TProductCategory>>(HASH);
  },

  getById: async (
    id?: null | TProductCategory["id"],
  ): Promise<null | TProductCategory> => {
    if (id === undefined || id === null) return null;

    return (await redis.hget<TProductCategory>(HASH, String(id))) ?? null;
  },

  popById: async (
    id: string | TProductCategory["id"],
  ): Promise<null | TProductCategory> => {
    const [category] = await redis
      .pipeline()
      .hget<TProductCategory>(HASH, String(id))
      .hdel(HASH, String(id))
      .exec<[null | TProductCategory, number]>();

    return category ?? null;
  },

  set: async (category: TProductCategory): Promise<void> => {
    await redis.hset(HASH, { [category.id]: JSON.stringify(category) });
  },
};

export { categoriesStore };

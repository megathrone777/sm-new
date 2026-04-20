import { sortByOrder } from "@/utils";

import { redis } from "./redis";

const HASH = "products";
const SEARCH_PREFIX = "product:";

type TProductSearchEntry = Pick<TProduct, "id" | "imageUrl" | "price" | "slug" | "title">;

const productsStore = {
  delete: async (slug: string, id: TProduct["id"]): Promise<void> => {
    await redis
      .pipeline()
      .hdel(HASH, slug)
      .del(`${SEARCH_PREFIX}${id}`)
      .exec();
  },

  getAll: async (): Promise<TProduct[]> => {
    const products = await redis.hgetall<Record<string, TProduct>>(HASH);

    if (!products) return [];

    return Object.values(products).sort(
      (a: TProduct, b: TProduct): number => a.sortOrder - b.sortOrder || a.id - b.id,
    );
  },

  getAllRaw: async (): Promise<null | Record<string, TProduct>> => {
    return redis.hgetall<Record<string, TProduct>>(HASH);
  },

  getBySlug: async (slug: string): Promise<null | TProduct> => {
    return (await redis.hget<TProduct>(HASH, slug)) ?? null;
  },

  set: async (product: TProduct): Promise<void> => {
    const searchEntry: TProductSearchEntry = {
      id: product.id,
      imageUrl: product.imageUrl,
      price: product.price,
      slug: product.slug,
      title: product.title,
    };

    await redis
      .pipeline()
      .hset(HASH, { [product.slug]: JSON.stringify(product) })
      .hset(`${SEARCH_PREFIX}${product.id}`, searchEntry)
      .exec();
  },

  sortedByCategory: async (): Promise<TProduct[]> => {
    const products = await productsStore.getAllRaw();

    return products ? sortByOrder(Object.values(products)) : [];
  },
};

export { productsStore };

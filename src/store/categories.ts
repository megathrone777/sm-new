import { sortByOrder } from "@/utils";

import { redis } from "./redis";

const HASH = "categories";

const categories = {
  delete: async (id: TProductCategory["id"]): Promise<void> => {
    await redis.hdel(HASH, `${id}`);
  },

  getAll: async (): Promise<TProductCategory[]> => {
    const [categoriesMap, productsMap] = await redis
      .pipeline()
      .hgetall<Record<string, TProductCategory>>(HASH)
      .hgetall<Record<string, TProduct>>("products")
      .exec<[null | Record<string, TProductCategory>, null | Record<string, TProduct>]>();

    if (!categoriesMap) return [];
    const products = productsMap ? sortByOrder(Object.values(productsMap)) : [];
    const allProducts = sortByOrder(Object.values(categoriesMap)).reduce<TProduct[]>(
      (accumulator, category) => {
        if (category.id === 0) {
          return accumulator;
        }

        return [
          ...accumulator,
          ...products.filter((product: TProduct): boolean => product.categoryId === category.id),
        ];
      },
      [],
    );

    return sortByOrder(
      Object.values(categoriesMap).map((category: TProductCategory): TProductCategory => {
        if (category.sortOrder === 0) {
          return {
            ...category,
            products: allProducts,
          };
        }

        return {
          ...category,
          products: products.filter(
            (product: TProduct): boolean => product.categoryId === category.id,
          ),
        };
      }),
    );
  },

  getById: async (id?: TProductCategory["id"]): Promise<null | TProductCategory> => {
    if (id === undefined || id === null) return null;

    return (await redis.hget<TProductCategory>(HASH, `${id}`)) ?? null;
  },

  popById: async (id: TProductCategory["id"]): Promise<null | TProductCategory> => {
    const [category] = await redis
      .pipeline()
      .hget<TProductCategory>(HASH, `${id}`)
      .hdel(HASH, `${id}`)
      .exec<[null | TProductCategory, number]>();

    return category ?? null;
  },

  set: async (category: TProductCategory): Promise<void> => {
    await redis.hset(HASH, { [category.id]: JSON.stringify(category) });
  },
};

export { categories };

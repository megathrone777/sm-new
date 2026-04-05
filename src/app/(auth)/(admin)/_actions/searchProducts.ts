"use server";
import { redis } from "@/lib";

import type { FlatIndexSchema } from "@upstash/redis";

type TProductSearchResult = {
  data: {
    id: number;
    imageUrl: string;
    price: number;
    slug: string;
    title: string;
  };
};

const PRODUCTS_SEARCH_INDEX = "idx:products";

const PRODUCTS_SEARCH_SCHEMA = {
  id: "U64",
  imageUrl: "TEXT",
  price: "F64",
  slug: "TEXT",
  title: "TEXT",
} as const satisfies FlatIndexSchema;

const searchProducts = async (query: string): Promise<TProductSearchResult["data"][]> => {
  if (!query.trim()) return [];

  const index = redis.search.index({
    name: PRODUCTS_SEARCH_INDEX,
    schema: PRODUCTS_SEARCH_SCHEMA,
  });

  const results = (await index.query({
    filter: {
      title: { $fuzzy: { prefix: true, value: query } },
    },
  })) as unknown as TProductSearchResult[];

  return results.map(({ data }) => data);
};

export { searchProducts };

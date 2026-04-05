"use server";
import { redis } from "@/lib";

import type { FlatIndexSchema } from "@upstash/redis";

type TModifierSearchResult = {
  data: {
    id: number;
    price: number;
    title: string;
  };
};

const PRODUCTS_SEARCH_INDEX = "idx:modifiers";

const PRODUCTS_SEARCH_SCHEMA = {
  id: "U64",
  price: "F64",
  title: "TEXT",
} as const satisfies FlatIndexSchema;

const searchModifiers = async (query: string): Promise<TModifierSearchResult["data"][]> => {
  if (!query.trim()) return [];

  const index = redis.search.index({
    name: PRODUCTS_SEARCH_INDEX,
    schema: PRODUCTS_SEARCH_SCHEMA,
  });

  const results = (await index.query({
    filter: {
      title: { $fuzzy: { prefix: true, value: query } },
    },
  })) as unknown as TModifierSearchResult[];

  return results.map(({ data }) => data);
};

export { searchModifiers };

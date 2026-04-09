"use server";
import { redis } from "@/lib";

import type { FlatIndexSchema } from "@upstash/redis";

type TClientSearchResult = {
  data: TClient;
};

const CLIENT_SEARCH_INDEX = "idx:clients";

const CLIENT_SEARCH_SCHEMA = {
  email: "TEXT",
  name: "TEXT",
  phoneNumber: "TEXT",
} as const satisfies FlatIndexSchema;

const searchClients = async (query: string): Promise<TClientSearchResult["data"][]> => {
  if (!query.trim()) return [];

  const index = redis.search.index({
    name: CLIENT_SEARCH_INDEX,
    schema: CLIENT_SEARCH_SCHEMA,
  });

  const results = (await index.query({
    filter: {
      $or: [
        { name: { $fuzzy: { prefix: true, value: query } } },
        { email: { $fuzzy: { prefix: true, value: query } } },
        { phoneNumber: { $fuzzy: { prefix: true, value: query } } },
      ],
    },
  })) as unknown as TClientSearchResult[];

  return results.map<TClient>(({ data }) => data);
};

export { searchClients };

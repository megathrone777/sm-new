"use server";
import { ordersHelpers } from "@/helpers/orders";
import { redis } from "@/store";

import type { FlatIndexSchema } from "@upstash/redis";

type TOrderSearchResult = {
  data: TOrder;
};

const ORDER_SEARCH_INDEX = "idx:orders";

const ORDER_SEARCH_SCHEMA = {
  clientEmail: "TEXT",
  clientName: "TEXT",
  clientPhoneNumber: "TEXT",
  status: "TEXT",
} as const satisfies FlatIndexSchema;

const searchOrders = async (query: string): Promise<TOrderSearchResult["data"][]> => {
  if (!query.trim()) return [];

  // If the query looks like a numeric ID, fetch directly
  if (/^\d+$/.test(query.trim())) {
    const order = await ordersHelpers.getOrderById(query.trim());

    return order ? [order] : [];
  }

  const index = redis.search.index({
    name: ORDER_SEARCH_INDEX,
    schema: ORDER_SEARCH_SCHEMA,
  });

  const results = (await index.query({
    filter: {
      $or: [
        { clientEmail: { $fuzzy: { prefix: true, value: query } } },
        { clientPhoneNumber: { $fuzzy: { prefix: true, value: query } } },
        { clientName: { $fuzzy: { prefix: true, value: query } } },
        { status: { $fuzzy: { prefix: true, value: query } } },
      ],
    },
  })) as unknown as TOrderSearchResult[];

  return results.map(({ data }) => data);
};

export { searchOrders };

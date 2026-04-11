"use server";
import { refresh } from "next/cache";

import { cartHelpers } from "@/helpers/cart";
import { redis } from "@/lib";

const ttlSeconds: number = 60 * 60 * 24 * 7;

const saveCart = async (cart: TCart): Promise<void> => {
  const sessionId = await cartHelpers.getSessionIdAndCreateIfMissing();

  await Promise.all([
    redis.hset(sessionId, { [sessionId]: cart }),
    redis.expire(sessionId, ttlSeconds),
  ]);
  refresh();
};

export { saveCart };

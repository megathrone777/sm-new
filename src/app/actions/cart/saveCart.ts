"use server";
import { refresh } from "next/cache";

import { getOrCreateCartSessionId } from "@/helpers";
import { redis } from "@/lib";

const ttlSeconds: number = 60 * 60 * 24 * 7;

const saveCart = async (cart: TCart): Promise<void> => {
  const sessionId = await getOrCreateCartSessionId();

  await redis.hset(sessionId, { [sessionId]: cart });
  await redis.expire(sessionId, ttlSeconds);
  refresh();
};

export { saveCart };

import { Realtime, type InferRealtimeEvents } from "@upstash/realtime";
import { custom, number, object } from "zod/v4";

import { redis } from "./redis";

const realtime = new Realtime({
  redis,
  schema: {
    newOrder: object({
      createdAt: number(),
      id: number(),
      order: custom<TOrder>(),
      updatedAt: number(),
    }),
    orderStatusChanged: object({
      id: number(),
      status: custom<TOrderStatus>(),
      updatedAt: number(),
    }),
  },
});

export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
export { realtime };

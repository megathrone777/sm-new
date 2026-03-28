import { type InferRealtimeEvents, Realtime } from "@upstash/realtime";
import { number, object, string } from "zod/v4";

import { redis } from "./redis";

const schema = {
  notification: {
    newOrder: object({
      created_at: number(),
      email: string(),
      price: number(),
    }),
  },
};

const realtime = new Realtime({ redis, schema });

export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
export { realtime };

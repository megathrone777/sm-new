import { Realtime, type InferRealtimeEvents } from "@upstash/realtime";
import { number, object } from "zod/v4";

import { redis } from "./redis";

const schema = {
  notification: {
    newOrder: object({
      createdAt: number(),
      updatedAt: number(),
    }),
  },
};

const realtime = new Realtime({ redis, schema });

export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
export { realtime };

import "dotenv/config";

import { Redis } from "@upstash/redis";
import moment from "moment";

const redis = new Redis({
  token: process.env.APP_KV_REST_API_TOKEN!,
  url: process.env.APP_KV_REST_API_URL!,
});

const DATE_FIELDS = ["createdAt", "comgateProcessedAt"] as const;
const ISO_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/;
const LEGACY_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";

const normalize = (value: unknown): null | string => {
  if (typeof value !== "string" || !value) return null;
  if (ISO_REGEX.test(value)) return null;

  const parsed = moment.utc(value, LEGACY_FORMAT, true);

  if (!parsed.isValid()) {
    const loose = moment.utc(value);

    if (!loose.isValid()) return null;

    return loose.toISOString();
  }

  return parsed.toISOString();
};

const migrate = async (): Promise<void> => {
  const ids = await redis.zrange<string[]>("orders", 0, -1);

  console.log(`Inspecting ${ids.length} orders`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const id of ids) {
    const order = await redis.hgetall<Record<string, unknown>>(`order:${id}`);

    if (!order) {
      failed++;
      continue;
    }

    const patch: Record<string, string> = {};

    for (const field of DATE_FIELDS) {
      const next = normalize(order[field]);

      if (next && next !== order[field]) {
        patch[field] = next;
      }
    }

    if (Object.keys(patch).length === 0) {
      skipped++;
      continue;
    }

    await redis.hset(`order:${id}`, patch);
    migrated++;
    console.log(`order:${id} →`, patch);
  }

  console.log(`\nDone. migrated=${migrated} skipped=${skipped} failed=${failed}`);
};

migrate().catch((error: unknown): void => {
  console.error(error);
  process.exit(1);
});

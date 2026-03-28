import { redis } from "@/db";

import type { RedisJSON } from "redis";

const appendJSON = async <T extends RedisJSON>(
  key: string,
  path: string,
  value: T,
): Promise<void> => {
  await redis.json.arrAppend(key, path, value);
};

export { appendJSON };

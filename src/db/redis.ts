import { createClient } from "redis";

const redis = createClient();

if (!redis.isOpen) {
  await redis.connect();
}

export { redis };

import { Redis } from "@upstash/redis";

const redis = new Redis({
  token: process.env.REDIS_API_TOKEN,
  url: process.env.REDIS_API_URL,
});

export { redis };

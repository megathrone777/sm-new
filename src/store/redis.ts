import { Redis } from "@upstash/redis";

const redis = new Redis({
  token: process.env.APP_KV_REST_API_TOKEN,
  url: process.env.APP_KV_REST_API_URL,
});

export { redis };

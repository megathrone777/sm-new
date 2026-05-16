import { redis } from "./redis";

const TERMS_KEY = "shop:terms";

const terms = {
  get: async (): Promise<TTerms> => {
    const raw = await redis.hgetall<Record<string, string>>(TERMS_KEY);
    const content = raw?.content ?? "";

    return { content };
  },

  set: async (patch: Partial<TTerms>): Promise<void> => {
    const stringified: Record<string, string> = {};

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) continue;
      stringified[key] = `${value}`;
    }

    if (!Object.keys(stringified).length) return;
    await redis.hset(TERMS_KEY, stringified);
  },
};

export { terms };

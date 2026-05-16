import { redis } from "./redis";

const RULES_KEY = "shop:rules";

const rules = {
  get: async (): Promise<TRules> => {
    const raw = await redis.hgetall<Record<string, string>>(RULES_KEY);
    const content = raw?.content ?? "";

    return { content };
  },

  set: async (patch: Partial<TRules>): Promise<void> => {
    const stringified: Record<string, string> = {};

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) continue;
      stringified[key] = `${value}`;
    }

    if (!Object.keys(stringified).length) return;
    await redis.hset(RULES_KEY, stringified);
  },
};

export { rules };

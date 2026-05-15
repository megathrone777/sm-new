import { redis } from "./redis";

const PROMOTION_KEY = "shop:promotion";

const DEFAULT_PROMOTION: TPromotion = {
  col1Text: "",
  col2Text: "",
};

const promotion = {
  get: async (): Promise<TPromotion> => {
    const raw = await redis.hgetall<Record<string, string>>(PROMOTION_KEY);

    if (!raw) return DEFAULT_PROMOTION;

    return {
      col1Text: raw.col1Text ?? DEFAULT_PROMOTION.col1Text,
      col2Text: raw.col2Text ?? DEFAULT_PROMOTION.col2Text,
    };
  },

  set: async (patch: Partial<TPromotion>): Promise<void> => {
    const stringified: Record<string, string> = {};

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) continue;
      stringified[key] = `${value}`;
    }

    if (!Object.keys(stringified).length) return;
    await redis.hset(PROMOTION_KEY, stringified);
  },
};

export { promotion };

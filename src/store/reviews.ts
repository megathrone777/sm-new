import { redis } from "./redis";

const HASH = "reviews";

const reviews = {
  create: async (review: TReview): Promise<void> => {
    await redis.hset(HASH, { [review.id]: JSON.stringify(review) });
  },

  delete: async (id: TReview["id"]): Promise<void> => {
    await redis.hdel(HASH, `${id}`);
  },

  getAll: async (): Promise<TReview[]> => {
    const reviews = await redis.hgetall<Record<string, TReview>>(HASH);

    if (!reviews) return [];

    return Object.values(reviews);
  },
};

export { reviews };
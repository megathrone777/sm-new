import { redis } from "./redis";

const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 30;

const key = (sessionId: string): string => `session:${sessionId}`;

const sessionsStore = {
  delete: async (sessionId: string): Promise<void> => {
    await redis.del(key(sessionId));
  },

  get: async (sessionId: string): Promise<null | TSessionData> => {
    const data = await redis.get<TSessionData>(key(sessionId));

    if (!data) return null;

    return typeof data === "string" ? JSON.parse(data) : data;
  },

  set: async (
    sessionId: string,
    data: TSessionData,
    ttlSeconds: number = DEFAULT_TTL_SECONDS,
  ): Promise<void> => {
    await redis.set(key(sessionId), JSON.stringify(data), { ex: ttlSeconds });
  },
};

export { sessionsStore };

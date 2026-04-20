import { redis } from "./redis";

const INDEX = "clients";

const hashKey = (phoneNumber: string): string => `client:${phoneNumber}`;

const clientsStore = {
  delete: async (phoneNumber: string): Promise<void> => {
    await redis.pipeline().del(hashKey(phoneNumber)).zrem(INDEX, phoneNumber).exec();
  },

  exists: async (phoneNumber: string): Promise<boolean> => {
    return (await redis.exists(hashKey(phoneNumber))) > 0;
  },

  getAll: async (offset = 0, limit = 50): Promise<TClient[]> => {
    const phones = await redis.zrange(INDEX, offset, offset + limit - 1, { rev: true });

    if (!phones?.length) return [];

    const pipeline = redis.pipeline();

    for (const phone of phones) {
      pipeline.hgetall(hashKey(phone as string));
    }

    const clients = await pipeline.exec<TClient[]>();

    return clients.filter(Boolean);
  },

  getByPhone: async (phoneNumber: string): Promise<null | TClient> => {
    const client = (await redis.hgetall(hashKey(phoneNumber))) as unknown as TClient | null;

    return client;
  },

  set: async (client: TClient, score: number = Date.now()): Promise<void> => {
    await redis
      .pipeline()
      .hset(hashKey(client.phoneNumber), {
        email: client.email,
        name: client.name,
        phoneNumber: client.phoneNumber,
      })
      .zadd(INDEX, { member: client.phoneNumber, score })
      .exec();
  },

  update: async (client: TClient): Promise<void> => {
    await redis.hset(hashKey(client.phoneNumber), {
      email: client.email,
      name: client.name,
      phoneNumber: client.phoneNumber,
    });
  },
};

export { clientsStore };

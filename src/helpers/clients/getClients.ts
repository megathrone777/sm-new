import { redis } from "@/lib";

const getClients = async (offset = 0, limit = 50): Promise<TClient[]> => {
  const phones = await redis.zrange("clients", offset, offset + limit - 1, { rev: true });

  if (!phones || !phones.length) return [];

  const pipeline = redis.pipeline();

  for (const phone of phones) {
    pipeline.hgetall(`client:${phone}`);
  }

  const clients = await pipeline.exec<TClient[]>();

  return clients.filter(Boolean);
};

export { getClients };

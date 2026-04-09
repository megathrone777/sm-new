import { redis } from "@/lib";

const getClientByPhone = async (phoneNumber: string): Promise<null | TClient> => {
  const client = (await redis.hgetall(`client:${phoneNumber}`)) as unknown as TClient;

  return client;
};

export { getClientByPhone };

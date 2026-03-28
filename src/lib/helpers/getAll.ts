import { redis } from "@/lib";

const getAll = async <D>(collection: string): Promise<D | null> => {
  const data = await redis.get<D>(collection);

  return data;
};

export { getAll };

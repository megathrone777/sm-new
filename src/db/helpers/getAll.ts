import { getClient } from "./redis";

const getAll = async <D>(collection: string): Promise<D> => {
  const client = await getClient();

  return (await client.hGetAll(collection)) as unknown as D;
};

export { getAll };

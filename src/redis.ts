import { createClient } from "redis";

const getClient = async () => {
  const client = createClient();

  await client.connect();

  return client;
};

export { getClient };

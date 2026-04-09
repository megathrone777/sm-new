import { redis } from "@/lib";

const getOrderById = async (id: number | string): Promise<null | TOrder> => {
  const order = (await redis.hgetall(`order:${id}`)) as unknown as TOrder;

  return order;
};

export { getOrderById };

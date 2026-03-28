import { redis } from "@/lib";

const getOrders = async (): Promise<TOrder[]> => {
  const orderIds = await redis.zrange("orders", 0, -1);
  const pipeline = redis.pipeline();

  if (orderIds && !!orderIds.length) {
    for (const orderId of orderIds) {
      pipeline.hgetall<Record<string, TOrder[]>>(`order:${orderId}`);
    }
    const orders = await pipeline.exec<TOrder[]>();

    return orders;
  }

  return [];
};

export { getOrders };

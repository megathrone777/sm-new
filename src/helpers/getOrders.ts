import { redis } from "@/lib";

const getOrders = async (offset = 0, limit = 10): Promise<TOrder[]> => {
  const orderIds = await redis.zrange("orders", offset, offset + limit - 1, {
    rev: true,
  });
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

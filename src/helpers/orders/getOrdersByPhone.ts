import { redis } from "@/lib";

const getOrdersByPhone = async (
  phoneNumber: string,
  offset = 0,
  limit = 20,
): Promise<TOrder[]> => {
  const orderIds = await redis.zrange(`orders:phone:${phoneNumber}`, offset, offset + limit - 1, {
    rev: true,
  });

  if (!orderIds || !orderIds.length) return [];

  const pipeline = redis.pipeline();

  for (const orderId of orderIds) {
    pipeline.hgetall(`order:${orderId}`);
  }

  const orders = await pipeline.exec<TOrder[]>();

  return orders.filter(Boolean);
};

export { getOrdersByPhone };

"use server";

import { store } from "@/store";
import { redis } from "@/store/redis";

const getCourierPosition = async (
  orderId: number
): Promise<{ latitude: number; longitude: number } | null> => {
  const order = await store.orders.getById(orderId);

  if (!order || order.status !== "took" || order.deliveryType !== "delivery" || !order.courier) {
    return null;
  }

  const courier = await redis.get<TCourierRecord>(`courier:${order.courier}`);

  if (!courier || !Number.isFinite(courier.latitude) || !Number.isFinite(courier.longitude)) {
    return null;
  }

  return { latitude: courier.latitude, longitude: courier.longitude };
};

export { getCourierPosition };

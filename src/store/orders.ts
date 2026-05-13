import moment from "moment-timezone";

import { redis } from "./redis";

const INDEX = "orders";
const COUNTER = "orders:counter";
const QUEUE_SCAN_LIMIT = 200;
const PENDING_WINDOW_MINUTES = 15;

const hashKey = (id: TOrder["id"]): string => `order:${id}`;
const phoneIndex = (phoneNumber: string): string => `orders:phone:${phoneNumber}`;
const promocodeIndex = (code: string): string => `promocode:${code}:orders`;

const fanOutById = async (ids: number[]): Promise<TOrder[]> => {
  if (!ids.length) return [];

  const pipeline = redis.pipeline();

  for (const id of ids) {
    pipeline.hgetall(hashKey(id));
  }

  const orders = await pipeline.exec<TOrder[]>();

  return orders.filter(Boolean);
};

const orders = {
  create: async (order: TOrder): Promise<void> => {
    await redis.hset<TOrder>(hashKey(order.id), order as unknown as Record<TOrder["id"], TOrder>);
  },

  delete: async (id: TOrder["id"], order: TOrder): Promise<void> => {
    const pipeline = redis.pipeline();

    pipeline.del(hashKey(id));
    pipeline.zrem(INDEX, `${id}`);

    if (order.clientPhoneNumber) {
      pipeline.zrem(phoneIndex(order.clientPhoneNumber), `${id}`);
    }

    if (order.promocode) {
      pipeline.zrem(promocodeIndex(order.promocode), `${id}`);
    }

    await pipeline.exec();
  },

  /*
  getActive: async (): Promise<TOrder[]> => {
    const ids = await redis.zrange<number[]>(INDEX, 0, QUEUE_SCAN_LIMIT - 1, { rev: true });

    if (!ids.length) return [];

    const orders = await fanOutById(ids);

    return orders.filter(
      (order): boolean => order.status !== "done" && order.status !== "placed",
    );
  },
  */

  getActiveToday: async (): Promise<TOrder[]> => {
    const ids = await redis.zrange<number[]>(INDEX, 0, QUEUE_SCAN_LIMIT - 1, { rev: true });

    if (!ids.length) return [];

    const orders = await fanOutById(ids);
    const start = moment.tz("Europe/Prague").startOf("day").valueOf();
    const end = moment.tz("Europe/Prague").endOf("day").valueOf();

    return orders.filter((order): boolean => {
      if (order.status === "done" || order.status === "placed") return false;

      const created = moment(order.createdAt).valueOf();

      return created >= start && created <= end;
    });
  },

  getAll: async (offset = 0, limit = 10): Promise<TOrder[]> => {
    const ids = await redis.zrange<number[]>(INDEX, offset, offset + limit - 1, { rev: true });

    return fanOutById(ids);
  },

  getById: async (id: TOrder["id"]): Promise<null | TOrder> => {
    const order = (await redis.hgetall(hashKey(id))) as unknown as null | TOrder;

    return order && Object.keys(order).length > 0 ? order : null;
  },

  getByPhone: async (phoneNumber: string, offset = 0, limit = 20): Promise<TOrder[]> => {
    const ids = await redis.zrange<number[]>(phoneIndex(phoneNumber), offset, offset + limit - 1, {
      rev: true,
    });

    return fanOutById(ids);
  },

  getByPromocode: async (code: string, offset = 0, limit = 50): Promise<TOrder[]> => {
    const ids = await redis.zrange<number[]>(promocodeIndex(code), offset, offset + limit - 1, {
      rev: true,
    });

    return fanOutById(ids);
  },

  getExistingOrder: async (
    phoneNumber: string,
  ): Promise<{ existingOrderIds: string[]; id: number }> => {
    const [existingOrderIds, id] = await redis
      .pipeline()
      .zrange(phoneIndex(phoneNumber), 0, -1)
      .incr(COUNTER)
      .exec<[string[], number]>();

    return { existingOrderIds: existingOrderIds ?? [], id };
  },

  getInQueueCount: async (excludeOrderId?: TOrder["id"]): Promise<number> => {
    const ids = await redis.zrange<number[]>(INDEX, 0, QUEUE_SCAN_LIMIT - 1, { rev: true });

    if (!ids.length) return 0;

    const pendingCutoff = moment().subtract(PENDING_WINDOW_MINUTES, "minutes").toISOString();
    const orders = await fanOutById(ids);

    return orders.filter((order): boolean => {
      if (excludeOrderId !== undefined && order.id === excludeOrderId) return false;
      if (order.status !== "new" && order.status !== "started") return false;

      if (order.paymentType === "cash" || order.paymentType === "cardAfterDelivery") {
        return true;
      }

      if (order.paymentType === "card") {
        const status = `${order.onlinePaymentStatus ?? ""}`;

        if (status === "PAID") return true;
        if (status === "PENDING" && order.createdAt >= pendingCutoff) return true;
      }

      return false;
    }).length;
  },

  registerNewOrder: async (order: TOrder, cartSessionId?: null | string): Promise<void> => {
    const pipeline = redis
      .pipeline()
      .hset<TOrder>(hashKey(order.id), order as unknown as Record<TOrder["id"], TOrder>)
      .zadd(INDEX, { member: `${order.id}`, score: +order.id })
      .zadd(phoneIndex(order.clientPhoneNumber), { member: `${order.id}`, score: +order.id })
      .hset(`client:${order.clientPhoneNumber}`, {
        email: order.clientEmail,
        name: order.clientName,
        phoneNumber: order.clientPhoneNumber,
      })
      .zadd("clients", { member: order.clientPhoneNumber, score: Date.now() });

    if (order.promocode) {
      pipeline.zadd(promocodeIndex(order.promocode), {
        member: `${order.id}`,
        score: +order.id,
      });
      pipeline.hincrby(`promocode:${order.promocode}`, "appliedCount", 1);
    }

    if (cartSessionId) pipeline.del(cartSessionId);
    await pipeline.exec();
  },

  update: async (id: TOrder["id"], patch: Partial<TOrder>): Promise<void> => {
    await redis.hset(hashKey(id), patch);
  },
};

export { orders };

import { redis } from "./redis";

const INDEX = "orders";
const COUNTER = "orders:counter";

const hashKey = (id: TOrder["id"]): string => `order:${id}`;
const phoneIndex = (phoneNumber: string): string => `orders:phone:${phoneNumber}`;
const promocodeIndex = (code: string): string => `promocode:${code}:orders`;

const fanOutById = async (ids: (number | string)[]): Promise<TOrder[]> => {
  if (!ids.length) return [];

  const pipeline = redis.pipeline();

  for (const id of ids) {
    pipeline.hgetall(hashKey(id));
  }

  const orders = await pipeline.exec<TOrder[]>();

  return orders.filter(Boolean);
};

const ordersStore = {
  delete: async (id: TOrder["id"], order: TOrder): Promise<void> => {
    const pipeline = redis.pipeline();

    pipeline.del(hashKey(id));
    pipeline.zrem(INDEX, String(id));

    if (order.clientPhoneNumber) {
      pipeline.zrem(phoneIndex(order.clientPhoneNumber), String(id));
    }

    if (order.promocode) {
      pipeline.zrem(promocodeIndex(order.promocode), String(id));
    }

    await pipeline.exec();
  },

  getAll: async (offset = 0, limit = 10): Promise<TOrder[]> => {
    const ids = await redis.zrange(INDEX, offset, offset + limit - 1, { rev: true });

    return fanOutById(ids as (number | string)[]);
  },

  getById: async (id: TOrder["id"]): Promise<null | TOrder> => {
    const order = (await redis.hgetall(hashKey(id))) as unknown as null | TOrder;

    return order && Object.keys(order).length > 0 ? order : null;
  },

  getByPhone: async (phoneNumber: string, offset = 0, limit = 20): Promise<TOrder[]> => {
    const ids = await redis.zrange(phoneIndex(phoneNumber), offset, offset + limit - 1, {
      rev: true,
    });

    return fanOutById(ids as (number | string)[]);
  },

  getByPromocode: async (code: string, offset = 0, limit = 50): Promise<TOrder[]> => {
    const ids = await redis.zrange(promocodeIndex(code), offset, offset + limit - 1, {
      rev: true,
    });

    return fanOutById(ids as (number | string)[]);
  },

  listExistingOrderIdsByPhoneAndAllocateNextId: async (
    phoneNumber: string,
  ): Promise<{ existingOrderIds: string[]; id: number }> => {
    const [existingOrderIds, id] = await redis
      .pipeline()
      .zrange(phoneIndex(phoneNumber), 0, -1)
      .incr(COUNTER)
      .exec<[string[], number]>();

    return { existingOrderIds: existingOrderIds ?? [], id };
  },

  registerNewOrder: async (order: TOrder): Promise<void> => {
    await redis
      .pipeline()
      .zadd(INDEX, { member: `${order.id}`, score: +order.id })
      .zadd(phoneIndex(order.clientPhoneNumber), { member: `${order.id}`, score: +order.id })
      .hset(`client:${order.clientPhoneNumber}`, {
        email: order.clientEmail,
        name: order.clientName,
        phoneNumber: order.clientPhoneNumber,
      })
      .zadd("clients", { member: order.clientPhoneNumber, score: Date.now() })
      .exec();
  },

  set: async (order: TOrder): Promise<void> => {
    await redis.hset<TOrder>(hashKey(order.id), order as unknown as Record<TOrder["id"], TOrder>);
  },

  update: async (id: string | TOrder["id"], patch: Partial<TOrder>): Promise<void> => {
    await redis.hset(hashKey(id), patch);
  },
};

export { ordersStore };

import { redis } from "./redis";

const INDEX = "delivery-conditions";

const hashKey = (id: TDeliveryCondition["id"]): string => `delivery-condition:${id}`;

const serializeFields = ({
  distanceFrom,
  distanceTo,
  id,
  minimumOrderPrice,
  price,
  text,
  title,
}: TDeliveryCondition): Record<string, number | string> => ({
  distanceFrom,
  distanceTo,
  id,
  minimumOrderPrice,
  price,
  text,
  title,
});

const parse = (raw: Record<string, unknown>): TDeliveryCondition => ({
  distanceFrom: +raw.distanceFrom!,
  distanceTo: +raw.distanceTo!,
  id: +raw.id!,
  minimumOrderPrice: +raw.minimumOrderPrice!,
  price: +raw.price!,
  text: `${raw.text ?? ""}`,
  title: `${raw.title ?? ""}`,
});

const deliveryConditions = {
  delete: async (id: TDeliveryCondition["id"]): Promise<void> => {
    await redis.pipeline().del(hashKey(id)).zrem(INDEX, `${id}`).exec();
  },

  getAll: async (): Promise<TDeliveryCondition[]> => {
    const ids = await redis.zrange<string[]>(INDEX, 0, -1);

    if (!ids.length) return [];
    const pipeline = redis.pipeline();

    for (const id of ids) {
      pipeline.hgetall(hashKey(+id));
    }

    const rows = await pipeline.exec<Record<string, unknown>[]>();

    return rows
      .filter((row): row is Record<string, unknown> => row !== null && Object.keys(row).length > 0)
      .map(parse);
  },

  getById: async (id: TDeliveryCondition["id"]): Promise<null | TDeliveryCondition> => {
    const raw = await redis.hgetall<Record<string, unknown>>(hashKey(id));

    return raw && Object.keys(raw).length > 0 ? parse(raw) : null;
  },

  set: async (condition: TDeliveryCondition): Promise<void> => {
    await redis
      .pipeline()
      .hset(hashKey(condition.id), serializeFields(condition))
      .zadd(INDEX, { member: `${condition.id}`, score: condition.distanceFrom })
      .exec();
  },
};

export { deliveryConditions };

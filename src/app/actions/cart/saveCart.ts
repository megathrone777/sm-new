"use server";
import { getOrCreateCartSessionId } from "@/helpers";
import { redis } from "@/lib";

const ttlSeconds: number = 60 * 60 * 24 * 7;
const now = (): number => Date.now();

const saveCart = async ({ products }: TCart): Promise<void> => {
  const sessionId = await getOrCreateCartSessionId();

  await redis.hset(sessionId, {
    products: JSON.stringify(products),
    // totalPrice: products.reduce(
    //   (accumulator: number, product: TProduct): number =>
    //     accumulator + product.price * product.quantity,
    //   0,
    // ),
    updatedAt: now(),
  });
  await redis.expire(sessionId, ttlSeconds);
};

export { saveCart };

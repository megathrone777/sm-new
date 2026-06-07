import { randomUUID } from "crypto";

import { redis } from "./redis";
import { shop } from "./shop";

const COOKIE_MAX_AGE: number = 60 * 60 * 24 * 7;
const COOKIE_NAME: string = "sid";
const TTL_SECONDS = 60 * 60 * 24 * 7;
const LOCK_TTL_SECONDS = 5;

const lockKey = (sessionId: string): string => `lock:${sessionId}`;

const getCategoryDiscount = (products: TCartProduct[]): number => {
  const productsWithDiscount: TCartProduct[] = products.filter(
    ({ isPromotionActive }: TCartProduct): boolean => Boolean(isPromotionActive),
  );
  const productsWithDiscountQuantity: number = productsWithDiscount.reduce<number>(
    (accumulator, { quantity }: TCartProduct): number => accumulator + quantity,
    0,
  );

  if (productsWithDiscount && !!productsWithDiscount.length && productsWithDiscount[0]) {
    const { promotionDiscountAmount, promotionForEveryXProducts } = productsWithDiscount[0];

    return (
      Math.floor(productsWithDiscountQuantity / promotionForEveryXProducts) *
      promotionDiscountAmount
    );
  }

  return 0;
};

const getCutleryPrice = (
  products: TCartProduct[],
  cutlery: TCart["cutlery"],
  cutleryPrice: number,
): number => {
  const freeCutleryQuantity: number = products.reduce(
    (accumulator: number, { freeCutleryCount, quantity }: TCartProduct): number =>
      accumulator + freeCutleryCount * quantity,
    0,
  );

  if (cutlery.quantity > freeCutleryQuantity) {
    return (cutlery.quantity - freeCutleryQuantity) * cutleryPrice;
  }

  return 0;
};

const getProductsPrice = (products: TCartProduct[], additionals: TCartAdditional[]): number => {
  const productsPrice: number = products.reduce<number>(
    (accumulator: number, { totalPrice }: TCartProduct): number => accumulator + totalPrice,
    0,
  );
  const additionalsPrice: number = additionals.reduce<number>(
    (accumulator: number, { totalPrice }: TCartAdditional): number => accumulator + totalPrice,
    0,
  );

  return productsPrice + additionalsPrice;
};

const getDeliveryDiscount = (productsPrice: number, deliveryType: TDeliveryType): number => {
  if (productsPrice > 500 && deliveryType === "pickup") {
    return 50;
  }

  return 0;
};

const getDeliveryPrice = (delivery: TDelivery): number => {
  if (delivery.price && delivery.type === "delivery") {
    return delivery.price;
  }

  return 0;
};

const cart = {
  delete: async (sessionId: string): Promise<void> => {
    await redis.del(sessionId);
  },

  get: async (): Promise<null | TCart> => {
    const sessionId = await cart.getSessionId();

    if (!sessionId) return null;

    const data = await redis.hgetall<Record<string, unknown>>(sessionId);

    if (!data || Object.keys(data).length === 0) return null;

    const { additionals, cutlery, delivery, products, promo, time, tips, ...cartRest } =
      data as unknown as TCart & { delivery: TDelivery & { time?: TSelectOption } };
    const legacyDeliveryTime = (delivery as { time?: TSelectOption }).time;
    const { time: _legacyTime, ...deliveryWithoutTime } = delivery;
    const resolvedTime: TSelectOption = time ??
      legacyDeliveryTime ?? { label: "Doručit teď", value: null };
    const { cutleryPrice } = await shop.getSettings();

    const categoryDiscount = getCategoryDiscount(products);
    const computedCutleryPrice = getCutleryPrice(products, cutlery, cutleryPrice);
    const productsPrice = getProductsPrice(products, additionals);
    const deliveryDiscount = getDeliveryDiscount(productsPrice, delivery.type);
    const computedDeliveryPrice = getDeliveryPrice({
      ...deliveryWithoutTime,
      conditions: delivery.conditions,
      type: delivery.type,
    });

    const subtotal: number =
      productsPrice +
      computedDeliveryPrice +
      computedCutleryPrice -
      categoryDiscount -
      deliveryDiscount -
      promo.discount;
    const tipsPercentage = tips?.percentage ?? 0;
    const tipsPrice: number = Math.round((subtotal * tipsPercentage) / 100);

    return {
      ...cartRest,
      additionals,
      categoryDiscount,
      cutlery: {
        ...cutlery,
        totalPrice: computedCutleryPrice,
      },
      delivery: {
        ...deliveryWithoutTime,
        price: computedDeliveryPrice,
      },
      products,
      promo,
      time: resolvedTime,
      tips: { percentage: tipsPercentage, price: tipsPrice },
      totalPrice: subtotal + tipsPrice,
    };
  },

  getDelivery: async (): Promise<null | TDelivery> => {
    const sessionId = await cart.getSessionId();

    if (!sessionId) return null;

    return redis.hget<TDelivery>(sessionId, "delivery");
  },

  getOrCreateSessionId: async (): Promise<string> => {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const existingSessionId = cookieStore.get(COOKIE_NAME)?.value;

    if (existingSessionId) return `cart:${existingSessionId}`;
    const sessionId: string = randomUUID();

    cookieStore.set({
      httpOnly: true,
      maxAge: COOKIE_MAX_AGE,
      name: COOKIE_NAME,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      value: sessionId,
    });

    return `cart:${sessionId}`;
  },

  getSessionId: async (): Promise<null | string> => {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const existingSessionId = cookieStore.get(COOKIE_NAME)?.value;

    return existingSessionId ? `cart:${existingSessionId}` : null;
  },

  lock: async (sessionId: string, retries = 10, delayMs = 100): Promise<boolean> => {
    for (let i = 0; i < retries; i++) {
      const result = await redis.set(lockKey(sessionId), "1", { ex: LOCK_TTL_SECONDS, nx: true });

      if (result === "OK") return true;

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    return false;
  },

  set: async (sessionId: string, patch: Partial<TCart>): Promise<void> => {
    await redis.pipeline().hset(sessionId, patch).expire(sessionId, TTL_SECONDS).exec();
  },

  unlock: async (sessionId: string): Promise<void> => {
    await redis.del(lockKey(sessionId));
  },
};

export {
  cart,
  getCategoryDiscount,
  getCutleryPrice,
  getDeliveryDiscount,
  getDeliveryPrice,
  getProductsPrice,
};

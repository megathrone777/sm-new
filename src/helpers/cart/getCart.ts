import { redis } from "@/lib";

import { getSessionId } from "./getSessionId";

const getCart = async (): Promise<null | TCart> => {
  const sessionId = await getSessionId();

  if (sessionId) {
    const cart = await redis.hgetall<Record<string, TCart>>(sessionId);

    if (cart && cart[sessionId] && !!Object.keys(cart).length) {
      const { additionals, delivery, products, ...restCart } = cart[sessionId];

      const getProductsPrice = (): number => {
        const productsPrice: number = products.reduce<number>(
          (accumulator: number, { totalPrice }: TCartProduct): number => accumulator + totalPrice,
          0,
        );
        const additionalsPrice: number = additionals.reduce<number>(
          (accumulator: number, { totalPrice }: TCartAdditional): number =>
            accumulator + totalPrice,
          0,
        );

        return productsPrice + additionalsPrice;
      };

      const getDeliveryDiscount = (): number => {
        if (getProductsPrice() > 500 && delivery.type === "pickup") {
          return 50;
        }

        return 0;
      };

      const getDeliveryPrice = (): number => {
        if (delivery.price && delivery.type === "delivery") {
          return delivery.price;
        }

        return 0;
      };

      const totalPrice: number = getProductsPrice() + getDeliveryPrice() - getDeliveryDiscount();

      return {
        ...restCart,
        additionals,
        delivery,
        products,
        totalPrice,
      };
    }
  }

  return null;
};

export { getCart };

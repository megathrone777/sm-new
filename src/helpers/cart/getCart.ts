import { shopHelpers } from "@/helpers/shop";
import { redis } from "@/lib";

import { getSessionId } from "./getSessionId";

const getCart = async (): Promise<null | TCart> => {
  const sessionId = await getSessionId();

  if (sessionId) {
    const cart = await redis.hgetall<Record<string, TCart>>(sessionId);
    const { cutleryPrice } = await shopHelpers.getSettings();

    if (cart && cart[sessionId] && !!Object.keys(cart).length) {
      const { additionals, cutlery, delivery, products, promo, ...cartRest } = cart[sessionId];

      const getCategoryDiscount = (): number => {
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

      const getCutleryPrice = (): number => {
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

      const totalPrice: number =
        getProductsPrice() +
        getDeliveryPrice() +
        getCutleryPrice() -
        getCategoryDiscount() -
        getDeliveryDiscount() -
        promo.discount;

      return {
        ...cartRest,
        additionals,
        categoryDiscount: getCategoryDiscount(),
        cutlery: {
          ...cutlery,
          totalPrice: getCutleryPrice(),
        },
        delivery: {
          ...delivery,
          price: getDeliveryPrice(),
        },
        products,
        promo,
        totalPrice,
      };
    }
  }

  return null;
};

export { getCart };

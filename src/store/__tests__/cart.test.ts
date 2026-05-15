import { describe, expect, it } from "@jest/globals";

jest.mock("../redis", () => ({}));

import {
  getCategoryDiscount,
  getCutleryPrice,
  getDeliveryDiscount,
  getDeliveryPrice,
  getProductsPrice,
} from "../cart";

describe("cart pricing helpers", () => {
  describe("getCategoryDiscount", () => {
    it("returns 0 when no products have promotion active", () => {
      const products = [
        { isPromotionActive: false, promotionDiscountAmount: 10, promotionForEveryXProducts: 2, quantity: 3 },
        { isPromotionActive: false, promotionDiscountAmount: 10, promotionForEveryXProducts: 2, quantity: 1 },
      ] as TCartProduct[];

      expect(getCategoryDiscount(products)).toBe(0);
    });

    it("returns 0 when products array is empty", () => {
      expect(getCategoryDiscount([])).toBe(0);
    });

    it("calculates discount correctly for a single promotion product", () => {
      const products = [
        { isPromotionActive: true, promotionDiscountAmount: 15, promotionForEveryXProducts: 2, quantity: 4 },
      ] as TCartProduct[];

      // 4 / 2 = 2, 2 * 15 = 30
      expect(getCategoryDiscount(products)).toBe(30);
    });

    it("calculates discount with floor division", () => {
      const products = [
        { isPromotionActive: true, promotionDiscountAmount: 20, promotionForEveryXProducts: 3, quantity: 5 },
      ] as TCartProduct[];

      // Math.floor(5 / 3) = 1, 1 * 20 = 20
      expect(getCategoryDiscount(products)).toBe(20);
    });

    it("only counts products with promotion active for quantity", () => {
      const products = [
        { isPromotionActive: true, promotionDiscountAmount: 10, promotionForEveryXProducts: 2, quantity: 2 },
        { isPromotionActive: false, promotionDiscountAmount: 10, promotionForEveryXProducts: 2, quantity: 10 },
      ] as TCartProduct[];

      // only the first product counts: 2 / 2 = 1, 1 * 10 = 10
      expect(getCategoryDiscount(products)).toBe(10);
    });

    it("sums all promotion products quantities and applies first product's ratio", () => {
      const products = [
        { isPromotionActive: true, promotionDiscountAmount: 5, promotionForEveryXProducts: 1, quantity: 3 },
        { isPromotionActive: true, promotionDiscountAmount: 100, promotionForEveryXProducts: 10, quantity: 5 },
      ] as TCartProduct[];

      // Sum all promotion quantities = 8, first product ratio: 1 products → 5 discount
      // Math.floor(8 / 1) * 5 = 40
      expect(getCategoryDiscount(products)).toBe(40);
    });
  });

  describe("getCutleryPrice", () => {
    it("returns 0 when cutlery quantity is within the free limit", () => {
      const products = [
        { freeCutleryCount: 2, quantity: 1 },
        { freeCutleryCount: 1, quantity: 2 },
      ] as TCartProduct[];
      const cutlery = { quantity: 3, totalPrice: 0 };

      // Free: 2*1 + 1*2 = 4, cutlery quantity 3 <= 4 => 0
      expect(getCutleryPrice(products, cutlery, 10)).toBe(0);
    });

    it("calculates price for extra cutlery beyond free limit", () => {
      const products = [
        { freeCutleryCount: 1, quantity: 2 },
      ] as TCartProduct[];
      const cutlery = { quantity: 5, totalPrice: 0 };

      // Free: 1*2 = 2, extra: 5 - 2 = 3, 3 * 10 = 30
      expect(getCutleryPrice(products, cutlery, 10)).toBe(30);
    });

    it("returns 0 when no products have free cutlery", () => {
      const products = [
        { freeCutleryCount: 0, quantity: 1 },
      ] as TCartProduct[];
      const cutlery = { quantity: 2, totalPrice: 0 };

      // Free: 0, extra: 2 * 5 = 10
      expect(getCutleryPrice(products, cutlery, 5)).toBe(10);
    });

    it("returns 0 when cutlery quantity is 0", () => {
      const products = [{ freeCutleryCount: 2, quantity: 1 }] as TCartProduct[];
      const cutlery = { quantity: 0, totalPrice: 0 };

      expect(getCutleryPrice(products, cutlery, 10)).toBe(0);
    });

    it("for empty products array, no free cutlery counts", () => {
      const cutlery = { quantity: 3, totalPrice: 0 };

      expect(getCutleryPrice([], cutlery, 10)).toBe(30);
    });
  });

  describe("getProductsPrice", () => {
    it("sums product and additionals totalPrice", () => {
      const products = [
        { totalPrice: 200 },
        { totalPrice: 150 },
      ] as TCartProduct[];
      const additionals = [
        { totalPrice: 50 },
        { totalPrice: 30 },
      ] as TCartAdditional[];

      expect(getProductsPrice(products, additionals)).toBe(430);
    });

    it("returns 0 when both arrays are empty", () => {
      expect(getProductsPrice([], [])).toBe(0);
    });

    it("returns just products price when no additionals", () => {
      const products = [
        { totalPrice: 100 },
      ] as TCartProduct[];

      expect(getProductsPrice(products, [])).toBe(100);
    });

    it("returns just additionals price when no products", () => {
      const additionals = [
        { totalPrice: 75 },
      ] as TCartAdditional[];

      expect(getProductsPrice([], additionals)).toBe(75);
    });
  });

  describe("getDeliveryDiscount", () => {
    it("returns 0 when delivery type is not pickup", () => {
      expect(getDeliveryDiscount(600, "delivery")).toBe(0);
    });

    it("returns 0 when products price is not above 500", () => {
      expect(getDeliveryDiscount(500, "pickup")).toBe(0);
      expect(getDeliveryDiscount(400, "pickup")).toBe(0);
    });

    it("returns 50 when price > 500 and pickup", () => {
      expect(getDeliveryDiscount(501, "pickup")).toBe(50);
      expect(getDeliveryDiscount(1000, "pickup")).toBe(50);
    });
  });

  describe("getDeliveryPrice", () => {
    it("returns delivery price when type is delivery and price is set", () => {
      const delivery = { price: 49, type: "delivery" } as TDelivery;

      expect(getDeliveryPrice(delivery)).toBe(49);
    });

    it("returns 0 when delivery type is pickup", () => {
      const delivery = { price: 49, type: "pickup" } as TDelivery;

      expect(getDeliveryPrice(delivery)).toBe(0);
    });

    it("returns 0 when price is null even for delivery type", () => {
      const delivery = { price: null, type: "delivery" } as TDelivery;

      expect(getDeliveryPrice(delivery)).toBe(0);
    });

    it("returns 0 when price is 0", () => {
      const delivery = { price: 0, type: "delivery" } as TDelivery;

      expect(getDeliveryPrice(delivery)).toBe(0);
    });
  });
});
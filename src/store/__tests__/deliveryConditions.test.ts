import { describe, expect, it } from "@jest/globals";

jest.mock("../redis", () => ({}));

import { parseDeliveryCondition, serializeFields } from "../deliveryConditions";

describe("deliveryConditions helpers", () => {
  describe("serializeFields", () => {
    it("returns a flat record of strings and numbers", () => {
      const condition: TDeliveryCondition = {
        distanceFrom: 0,
        distanceTo: 5000,
        id: 1,
        minimumOrderPrice: 200,
        price: 49,
        text: "Free delivery",
        title: "Zone 1",
      };

      const result = serializeFields(condition);

      expect(result).toEqual({
        distanceFrom: 0,
        distanceTo: 5000,
        id: 1,
        minimumOrderPrice: 200,
        price: 49,
        text: "Free delivery",
        title: "Zone 1",
      });
    });
  });

  describe("parseDeliveryCondition", () => {
    it("parses raw record into typed delivery condition", () => {
      const raw = {
        distanceFrom: "0",
        distanceTo: "5000",
        id: "1",
        minimumOrderPrice: "200",
        price: "49",
        text: "Free delivery",
        title: "Zone 1",
      };

      const result = parseDeliveryCondition(raw);

      expect(result).toEqual({
        distanceFrom: 0,
        distanceTo: 5000,
        id: 1,
        minimumOrderPrice: 200,
        price: 49,
        text: "Free delivery",
        title: "Zone 1",
      });
    });

    it("handles numeric values already as numbers", () => {
      const raw = {
        distanceFrom: 0,
        distanceTo: 5000,
        id: 1,
        minimumOrderPrice: 200,
        price: 49,
        text: "Text",
        title: "Title",
      };

      const result = parseDeliveryCondition(raw);

      expect(result.price).toBe(49);
      expect(result.id).toBe(1);
    });

    it("handles missing text and title gracefully", () => {
      const raw = {
        distanceFrom: 0,
        distanceTo: 1000,
        id: 2,
        minimumOrderPrice: 0,
        price: 0,
        text: null,
        title: undefined,
      };

      const result = parseDeliveryCondition(raw);

      expect(result.text).toBe("");
      expect(result.title).toBe("");
    });
  });
});
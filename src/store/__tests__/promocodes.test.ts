import { describe, expect, it } from "@jest/globals";

jest.mock("../redis", () => ({}));

import { serializeFields } from "../promocodes";

describe("promocodes helpers", () => {
  describe("serializeFields", () => {
    it("serializes an active reusable promocode", () => {
      const promocode: Omit<TPromoCode, "orderIds"> = {
        activatedAt: "2024-01-01T00:00:00Z",
        appliedCount: 5,
        code: "PIZZA10",
        discount: 10,
        id: 1,
        isActive: true,
        isLimitedBySchedule: false,
        type: "reusable",
        usability: "permanent",
      };

      const result = serializeFields(promocode);

      expect(result).toEqual({
        activatedAt: "2024-01-01T00:00:00Z",
        appliedCount: 5,
        code: "PIZZA10",
        discount: 10,
        id: 1,
        isActive: "1",
        isLimitedBySchedule: "0",
        type: "reusable",
        usability: "permanent",
      });
    });

    it("serializes an inactive one-time promocode", () => {
      const promocode: Omit<TPromoCode, "orderIds"> = {
        activatedAt: "",
        appliedCount: 0,
        code: "ONETIME",
        discount: 50,
        id: 2,
        isActive: false,
        isLimitedBySchedule: true,
        type: "oneTime",
        usability: "",
      };

      const result = serializeFields(promocode);

      expect(result).toEqual({
        activatedAt: "",
        appliedCount: 0,
        code: "ONETIME",
        discount: 50,
        id: 2,
        isActive: "0",
        isLimitedBySchedule: "1",
        type: "oneTime",
        usability: "",
      });
    });

    it("handles missing optional fields with defaults", () => {
      const promocode: Omit<TPromoCode, "orderIds"> = {
        activatedAt: "" as TPromoCode["activatedAt"],
        appliedCount: 0,
        code: "TEST",
        discount: 20,
        id: 3,
        isActive: false,
        isLimitedBySchedule: false,
        type: "oneTime",
        usability: "" as TPromoCode["usability"],
      };

      const result = serializeFields(promocode);

      expect(result.activatedAt).toBe("");
      expect(result.usability).toBe("");
    });
  });
});
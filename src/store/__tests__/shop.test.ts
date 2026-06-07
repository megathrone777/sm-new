import { describe, expect, it } from "@jest/globals";

jest.mock("../redis", () => ({}));

import { parseSchedule, parseScheduleDay, parseSettingsOverrides } from "../shop";

describe("shop helpers", () => {
  describe("parseSettingsOverrides", () => {
    it("returns empty object for null input", () => {
      expect(parseSettingsOverrides(null)).toEqual({});
    });

    it("converts cutleryPrice to a number", () => {
      const result = parseSettingsOverrides({ cutleryPrice: "15" });

      expect(result.cutleryPrice).toBe(15);
    });

    it("handles cutleryPrice as number already", () => {
      const result = parseSettingsOverrides({ cutleryPrice: 20 });

      expect(result.cutleryPrice).toBe(20);
    });

    it("converts isAvailable from string 'true'", () => {
      const result = parseSettingsOverrides({ isAvailable: "true" });

      expect(result.isAvailable).toBe(true);
    });

    it("converts isAvailable from string '1'", () => {
      const result = parseSettingsOverrides({ isAvailable: "1" });

      expect(result.isAvailable).toBe(true);
    });

    it("converts isAvailable from number 1", () => {
      const result = parseSettingsOverrides({ isAvailable: 1 });

      expect(result.isAvailable).toBe(true);
    });

    it("converts isAvailable from boolean true", () => {
      const result = parseSettingsOverrides({ isAvailable: true });

      expect(result.isAvailable).toBe(true);
    });

    it("converts isAvailable to false for other values", () => {
      const result = parseSettingsOverrides({ isAvailable: "false" });

      expect(result.isAvailable).toBe(false);
    });

    it("converts string fields to string", () => {
      const result = parseSettingsOverrides({ email: "test@test.cz", title: 123 });

      expect(result.email).toBe("test@test.cz");
      expect(result.title).toBe("123");
    });

    it("skips null and undefined values", () => {
      const result = parseSettingsOverrides({
        email: undefined,
        phone: "+420123456789",
        title: null,
      });

      expect(result).not.toHaveProperty("title");
      expect(result).not.toHaveProperty("email");
      expect(result.phone).toBe("+420123456789");
    });

    it("handles mixed overrides correctly", () => {
      const result = parseSettingsOverrides({
        cutleryPrice: "12.5",
        isAvailable: "1",
        title: "Test Title",
      });

      expect(result).toEqual({
        cutleryPrice: 12.5,
        isAvailable: true,
        title: "Test Title",
      });
    });
  });

  describe("parseScheduleDay", () => {
    it("returns defaults for null input", () => {
      const result = parseScheduleDay(null);

      expect(result).toEqual({
        closeTime: "22:00",
        lastTimeForDelivery: "21:00",
        openTime: "11:00",
      });
    });

    it("returns defaults for non-object input", () => {
      const result = parseScheduleDay("invalid");

      expect(result).toEqual({
        closeTime: "22:00",
        lastTimeForDelivery: "21:00",
        openTime: "11:00",
      });
    });

    it("returns parsed times from partial input", () => {
      const result = parseScheduleDay({ openTime: "10:00" });

      expect(result.openTime).toBe("10:00");
      expect(result.closeTime).toBe("22:00");
      expect(result.lastTimeForDelivery).toBe("21:00");
    });

    it("returns all fields from full input", () => {
      const result = parseScheduleDay({
        closeTime: "23:00",
        lastTimeForDelivery: "22:00",
        openTime: "10:00",
      });

      expect(result).toEqual({
        closeTime: "23:00",
        lastTimeForDelivery: "22:00",
        openTime: "10:00",
      });
    });
  });

  describe("parseSchedule", () => {
    it("returns default schedule for null input", () => {
      const result = parseSchedule(null);

      for (const day of [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ] as TWeekDay[]) {
        expect(result[day]).toEqual({
          closeTime: "22:00",
          lastTimeForDelivery: "21:00",
          openTime: "11:00",
        });
      }
    });

    it("merges overrides keeping defaults for unset days", () => {
      const result = parseSchedule({
        monday: { openTime: "09:00" },
      });

      expect(result.monday.openTime).toBe("09:00");
      expect(result.monday.closeTime).toBe("22:00");
      expect(result.tuesday.openTime).toBe("11:00");
    });

    it("all 7 days are present in the result", () => {
      const result = parseSchedule(null);
      const days = Object.keys(result);

      expect(days).toHaveLength(7);
      expect(days.sort()).toEqual([
        "friday",
        "monday",
        "saturday",
        "sunday",
        "thursday",
        "tuesday",
        "wednesday",
      ]);
    });
  });
});

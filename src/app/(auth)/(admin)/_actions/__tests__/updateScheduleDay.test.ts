import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { updateScheduleDay } from "../updateScheduleDay";

jest.mock("@/store", () => ({
  store: {
    sessions: { get: jest.fn() },
    shop: { setScheduleDay: jest.fn() },
  },
}));

jest.mock("@/store/shop", () => ({
  WEEK_DAYS: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    closeTime: "22:00",
    day: "monday",
    lastTimeForDelivery: "21:00",
    openTime: "11:00",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.shop.setScheduleDay).mockResolvedValue(undefined);
});

describe("updateScheduleDay", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateScheduleDay(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.shop.setScheduleDay).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error for an invalid day name", async () => {
      const result = await updateScheduleDay(null, makeFormData({ day: "funday" }));

      expect(result).toEqual({ message: "Invalid day", type: "error" });
    });

    it("returns error when openTime is not HH:mm", async () => {
      const result = await updateScheduleDay(null, makeFormData({ openTime: "9:00" }));

      expect(result).toEqual({ message: "Times must be in HH:mm format", type: "error" });
    });

    it("returns error when closeTime is not HH:mm", async () => {
      const result = await updateScheduleDay(null, makeFormData({ closeTime: "22" }));

      expect(result).toEqual({ message: "Times must be in HH:mm format", type: "error" });
    });

    it("returns error when openTime >= closeTime", async () => {
      const result = await updateScheduleDay(
        null,
        makeFormData({ closeTime: "11:00", openTime: "22:00" }),
      );

      expect(result).toEqual({ message: "Open time must be before close time", type: "error" });
    });

    it("returns error when openTime equals closeTime", async () => {
      const result = await updateScheduleDay(
        null,
        makeFormData({ closeTime: "11:00", openTime: "11:00" }),
      );

      expect(result).toEqual({ message: "Open time must be before close time", type: "error" });
    });

    it("returns error when lastTimeForDelivery is after closeTime", async () => {
      const result = await updateScheduleDay(
        null,
        makeFormData({ closeTime: "22:00", lastTimeForDelivery: "23:00" }),
      );

      expect(result).toEqual({
        message: "Last delivery time cannot be after close time",
        type: "error",
      });
    });
  });

  describe("success", () => {
    it("saves schedule for the specified day", async () => {
      await updateScheduleDay(null, makeFormData({ day: "friday" }));

      expect(store.shop.setScheduleDay).toHaveBeenCalledWith("friday", {
        closeTime: "22:00",
        lastTimeForDelivery: "21:00",
        openTime: "11:00",
      });
    });

    it("accepts lastTimeForDelivery equal to closeTime", async () => {
      const result = await updateScheduleDay(
        null,
        makeFormData({ closeTime: "22:00", lastTimeForDelivery: "22:00" }),
      );

      expect(result.type).toBe("success");
    });

    it("revalidates admin settings and home layout", async () => {
      await updateScheduleDay(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/settings");
      expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
    });

    it("returns success with the day name in the message", async () => {
      const result = await updateScheduleDay(null, makeFormData({ day: "saturday" }));

      expect(result).toEqual({ message: "saturday schedule updated", type: "success" });
    });
  });
});

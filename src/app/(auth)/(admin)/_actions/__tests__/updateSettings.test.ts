import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { updateSettings } from "../updateSettings";

jest.mock("@/store", () => ({
  store: {
    sessions: { get: jest.fn() },
    shop: { setSettings: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const formData = new FormData();
  const defaults: Record<string, string> = {
    address: "Milíčova 471/25",
    businessName: "MSN form s.r.o.",
    closedByOverloadText: "Zavřeno z důvodu party.",
    closedByOverloadTitle: "Teď objednat není možné.",
    closedByScheduleText: "Rozvoz Pn.–Čt. 11–22",
    closedByScheduleTitle: "Teď máme zavřeno.",
    companyDetails: "MSN form s.r.o.\nIČ: 099 07 017",
    cutleryPrice: "10",
    email: "info@sushiman.cz",
    lastTimeForPickup: "21:00",
    phone: "+420 792 745 116",
    title: "Rozvážíme",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    formData.set(k, v);
  }

  return formData;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.shop.setSettings).mockResolvedValue(undefined);
});

describe("updateSettings", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateSettings(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.shop.setSettings).not.toHaveBeenCalled();
    });

    it("returns error when role is not admin", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue({ role: "user" } as never);

      const result = await updateSettings(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await updateSettings(null, makeFormData({ title: "   " }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
      expect(store.shop.setSettings).not.toHaveBeenCalled();
    });

    it("returns error when cutleryPrice is empty", async () => {
      const result = await updateSettings(null, makeFormData({ cutleryPrice: "" }));

      expect(result).toEqual({ message: "Cutlery price must be a number", type: "error" });
    });

    it("returns error when cutleryPrice is not a number", async () => {
      const result = await updateSettings(null, makeFormData({ cutleryPrice: "abc" }));

      expect(result).toEqual({ message: "Cutlery price must be a number", type: "error" });
    });
  });

  describe("success", () => {
    it("saves all fields with correct types", async () => {
      await updateSettings(null, makeFormData({ cutleryPrice: "15" }));

      expect(store.shop.setSettings).toHaveBeenCalledWith(
        expect.objectContaining({
          cutleryPrice: 15,
          email: "info@sushiman.cz",
          title: "Rozvážíme",
        }),
      );
    });

    it("parses cutleryPrice as a number", async () => {
      await updateSettings(null, makeFormData({ cutleryPrice: "12.5" }));

      const [patch] = jest.mocked(store.shop.setSettings).mock.calls[0] as [
        Partial<TShopSettings>
      ];

      expect(patch.cutleryPrice).toBe(12.5);
    });

    it("sets isAvailable to true when the checkbox field is present", async () => {
      const formData = makeFormData();

      formData.set("isAvailable", "on");
      await updateSettings(null, formData);

      const [patch] = jest.mocked(store.shop.setSettings).mock.calls[0] as [
        Partial<TShopSettings>
      ];

      expect(patch.isAvailable).toBe(true);
    });

    it("sets isAvailable to false when the checkbox field is absent", async () => {
      await updateSettings(null, makeFormData());

      const [patch] = jest.mocked(store.shop.setSettings).mock.calls[0] as [
        Partial<TShopSettings>
      ];

      expect(patch.isAvailable).toBe(false);
    });

    it("revalidates admin settings and home layout", async () => {
      await updateSettings(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/settings");
      expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
    });

    it("returns success result", async () => {
      const result = await updateSettings(null, makeFormData());

      expect(result).toEqual({ message: "Settings updated", type: "success" });
    });
  });
});

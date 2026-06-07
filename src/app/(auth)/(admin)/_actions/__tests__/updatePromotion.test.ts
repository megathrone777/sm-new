import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { updatePromotion } from "../updatePromotion";

jest.mock("@/store", () => ({
  store: {
    promotion: { set: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    col1Text: "<ul><li>Položka 1</li><li>Položka 2</li></ul>",
    col2Text: "<span>-50 Kč</span><p>Sleva na set</p>",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.promotion.set).mockResolvedValue(undefined);
});

describe("updatePromotion", () => {
  describe("auth", () => {
    it("returns error and does not save when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updatePromotion(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.promotion.set).not.toHaveBeenCalled();
    });

    it("returns error and does not save when role is not admin", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue({ role: "user" } as never);

      const result = await updatePromotion(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.promotion.set).not.toHaveBeenCalled();
    });
  });

  describe("success", () => {
    it("saves both column texts to the store", async () => {
      await updatePromotion(null, makeFormData());

      expect(store.promotion.set).toHaveBeenCalledTimes(1);
      expect(store.promotion.set).toHaveBeenCalledWith({
        col1Text: "<ul><li>Položka 1</li><li>Položka 2</li></ul>",
        col2Text: "<span>-50 Kč</span><p>Sleva na set</p>",
      });
    });

    it("trims surrounding whitespace while preserving inner HTML", async () => {
      await updatePromotion(null, makeFormData({ col1Text: "  <ul><li>X</li></ul>  " }));

      const [patch] = jest.mocked(store.promotion.set).mock.calls[0] as [Partial<TPromotion>];

      expect(patch.col1Text).toBe("<ul><li>X</li></ul>");
    });

    it("saves empty string when a field is blank", async () => {
      await updatePromotion(null, makeFormData({ col2Text: "   " }));

      const [patch] = jest.mocked(store.promotion.set).mock.calls[0] as [Partial<TPromotion>];

      expect(patch.col2Text).toBe("");
    });

    it("revalidates the admin promotion page", async () => {
      await updatePromotion(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/promotion");
    });

    it("revalidates the home layout so the public page reflects changes", async () => {
      await updatePromotion(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
    });

    it("returns a success result", async () => {
      const result = await updatePromotion(null, makeFormData());

      expect(result).toEqual({ message: "Promotion updated", type: "success" });
    });
  });
});

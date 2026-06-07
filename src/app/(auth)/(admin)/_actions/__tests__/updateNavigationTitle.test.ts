import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { updateNavigationTitle } from "../updateNavigationTitle";

jest.mock("@/store", () => ({
  store: {
    sessions: { get: jest.fn() },
    shop: { setNavTitle: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const formData = new FormData();
  const defaults: Record<string, string> = {
    href: "/#about-section",
    title: "O nás",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    formData.set(k, v);
  }

  return formData;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.shop.setNavTitle).mockResolvedValue(undefined);
});

describe("updateNavigationTitle", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateNavigationTitle(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.shop.setNavTitle).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when href is empty", async () => {
      const result = await updateNavigationTitle(null, makeFormData({ href: "   " }));

      expect(result).toEqual({ message: "Href is required", type: "error" });
      expect(store.shop.setNavTitle).not.toHaveBeenCalled();
    });

    it("returns error when title is empty", async () => {
      const result = await updateNavigationTitle(null, makeFormData({ title: "   " }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
      expect(store.shop.setNavTitle).not.toHaveBeenCalled();
    });
  });

  describe("success", () => {
    it("saves the trimmed href and title", async () => {
      await updateNavigationTitle(null, makeFormData({ href: " /menu ", title: " Menu " }));
      expect(store.shop.setNavTitle).toHaveBeenCalledWith("/menu", "Menu");
    });

    it("revalidates admin navigation and home layout", async () => {
      await updateNavigationTitle(null, makeFormData());
      expect(revalidatePath).toHaveBeenCalledWith("/admin/navigation");
      expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
    });

    it("returns success with the title in the message", async () => {
      const result = await updateNavigationTitle(null, makeFormData({ title: "O nás" }));

      expect(result).toEqual({
        message: "Navigation item \"O nás\" updated",
        type: "success",
      });
    });
  });
});

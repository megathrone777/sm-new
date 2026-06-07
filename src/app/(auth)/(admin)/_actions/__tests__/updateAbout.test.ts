import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { updateAbout } from "../updateAbout";

jest.mock("@/store", () => ({
  store: {
    about: { set: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    description: "Jsme nejlepší sushi restaurace v Praze.",
    title: "O nás",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.about.set).mockResolvedValue(undefined);
});

describe("updateAbout", () => {
  describe("auth", () => {
    it("returns error and does not save when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateAbout(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.about.set).not.toHaveBeenCalled();
    });

    it("returns error and does not save when role is not admin", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue({ role: "user" } as never);

      const result = await updateAbout(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.about.set).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await updateAbout(null, makeFormData({ title: "   " }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
      expect(store.about.set).not.toHaveBeenCalled();
    });

    it("returns error when description is empty", async () => {
      const result = await updateAbout(null, makeFormData({ description: "   " }));

      expect(result).toEqual({ message: "Description is required", type: "error" });
      expect(store.about.set).not.toHaveBeenCalled();
    });
  });

  describe("success", () => {
    it("saves trimmed title and description to the store", async () => {
      await updateAbout(null, makeFormData({ description: "  Popis  ", title: "  O nás  " }));

      expect(store.about.set).toHaveBeenCalledWith({
        description: "Popis",
        title: "O nás",
      });
    });

    it("revalidates the admin about page", async () => {
      await updateAbout(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/about");
    });

    it("revalidates the home layout so the public page reflects changes", async () => {
      await updateAbout(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
    });

    it("returns a success result", async () => {
      const result = await updateAbout(null, makeFormData());

      expect(result).toEqual({ message: "About section updated", type: "success" });
    });
  });
});

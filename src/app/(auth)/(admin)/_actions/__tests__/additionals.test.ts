import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { createAdditional } from "../createAdditional";
import { updateAdditional } from "../updateAdditional";

jest.mock("@/store", () => ({
  store: {
    additionals: { create: jest.fn(), getAll: jest.fn(), getById: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    price: "30",
    sortOrder: "1",
    title: "Ginger",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.additionals.create).mockResolvedValue(undefined);
  jest.mocked(store.additionals.getAll).mockResolvedValue([] as never);

  jest.mocked(store.additionals.getById).mockResolvedValue({
    id: 1,
    price: 30,
    sortOrder: 1,
    title: "Ginger",
  });
});

describe("createAdditional", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await createAdditional(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.additionals.create).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await createAdditional(null, makeFormData({ title: "" }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
    });
  });

  describe("success", () => {
    it("assigns id=1 when there are no existing additionals", async () => {
      jest.mocked(store.additionals.getAll).mockResolvedValue([] as never);

      await createAdditional(null, makeFormData());

      expect(store.additionals.create).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    });

    it("assigns id = max existing id + 1", async () => {
      jest.mocked(store.additionals.getAll).mockResolvedValue([
        { id: 2, price: 20, sortOrder: 1, title: "A" },
        { id: 5, price: 30, sortOrder: 2, title: "B" },
      ] as never);

      await createAdditional(null, makeFormData());

      expect(store.additionals.create).toHaveBeenCalledWith(expect.objectContaining({ id: 6 }));
    });

    it("parses price and sortOrder as numbers", async () => {
      await createAdditional(null, makeFormData({ price: "45", sortOrder: "3" }));

      expect(store.additionals.create).toHaveBeenCalledWith(
        expect.objectContaining({ price: 45, sortOrder: 3 }),
      );
    });

    it("revalidates the admin additionals page", async () => {
      await createAdditional(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/additionals");
    });

    it("returns success with title in the message", async () => {
      const result = await createAdditional(null, makeFormData({ title: "Avocado" }));

      expect(result).toEqual({ message: "Avocado successfully created", type: "success" });
    });
  });
});

describe("updateAdditional", () => {
  const fd = (overrides: Record<string, string> = {}): FormData =>
    makeFormData({ id: "1", ...overrides });

  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateAdditional(null, fd());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("throws when additional is not found", async () => {
      jest.mocked(store.additionals.getById).mockResolvedValue(null);

      await expect(updateAdditional(null, fd({ id: "99" }))).rejects.toThrow(
        "Additional 99 not found",
      );
    });
  });

  describe("success", () => {
    it("merges updated fields with the existing additional", async () => {
      await updateAdditional(null, fd({ price: "50", title: "Truffle" }));

      expect(store.additionals.create).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, price: 50, title: "Truffle" }),
      );
    });

    it("revalidates the admin additionals page", async () => {
      await updateAdditional(null, fd());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/additionals");
    });

    it("returns success with title in the message", async () => {
      const result = await updateAdditional(null, fd({ title: "Wasabi" }));

      expect(result).toEqual({
        message: "Additional Wasabi successfully updated",
        type: "success",
      });
    });
  });
});

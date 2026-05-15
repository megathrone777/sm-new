import { beforeEach, describe, expect, it } from "@jest/globals";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { redis, store } from "@/store";

import { createCategory } from "../createCategory";
import { updateCategory } from "../updateCategory";

jest.mock("@/store", () => ({
  redis: { pipeline: jest.fn() },
  store: {
    categories: { getAll: jest.fn(), getById: jest.fn(), set: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("@vercel/blob", () => ({
  del: jest.fn().mockResolvedValue(undefined),
  put: jest.fn().mockResolvedValue({ url: "https://blob.vercel-storage.com/test-image.jpg" }),
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    sortOrder: "1",
    title: "Rolls",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

const makeExistingCategory = (overrides: Partial<TProductCategory> = {}): TProductCategory => ({
  id: 1,
  imageUrl: "",
  isPromotionActive: false,
  products: [],
  promotionDiscountAmount: 0,
  promotionForEveryXProducts: 0,
  sortOrder: 1,
  title: "Rolls",
  ...overrides,
});

const makePipeline = (): {
  exec: jest.Mock;
  hset: jest.Mock;
} => ({
  exec: jest.fn().mockResolvedValue(undefined),
  hset: jest.fn().mockReturnThis(),
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.categories.set).mockResolvedValue(undefined as never);
  jest.mocked(store.categories.getAll).mockResolvedValue([makeExistingCategory()] as never);
  jest.mocked(store.categories.getById).mockResolvedValue(makeExistingCategory() as never);
  jest.mocked(redis.pipeline).mockReturnValue(makePipeline() as never);
});

describe("createCategory", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await createCategory(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.categories.set).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await createCategory(null, makeFormData({ title: "" }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
    });
  });

  describe("success", () => {
    it("assigns id=1 when there are no real categories (only id=0 uncategorised)", async () => {
      jest
        .mocked(store.categories.getAll)
        .mockResolvedValue([makeExistingCategory({ id: 0 })] as never);

      await createCategory(null, makeFormData());

      expect(store.categories.set).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    });

    it("assigns id = max real category id + 1", async () => {
      jest
        .mocked(store.categories.getAll)
        .mockResolvedValue([
          makeExistingCategory({ id: 3 }),
          makeExistingCategory({ id: 7 }),
        ] as never);

      await createCategory(null, makeFormData());

      expect(store.categories.set).toHaveBeenCalledWith(expect.objectContaining({ id: 8 }));
    });

    it("uploads blob and saves the URL when an image file is provided", async () => {
      const fd = makeFormData();

      fd.set("image", new File(["data"], "banner.jpg", { type: "image/jpeg" }));

      await createCategory(null, fd);

      expect(put).toHaveBeenCalled();
      expect(store.categories.set).toHaveBeenCalledWith(
        expect.objectContaining({
          imageUrl: "https://blob.vercel-storage.com/test-image.jpg",
        }),
      );
    });

    it("skips blob upload when no image file is attached", async () => {
      await createCategory(null, makeFormData());

      expect(put).not.toHaveBeenCalled();
      expect(store.categories.set).toHaveBeenCalledWith(expect.objectContaining({ imageUrl: "" }));
    });

    it("revalidates the admin categories page", async () => {
      await createCategory(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/categories");
    });

    it("returns success with title in the message", async () => {
      const result = await createCategory(null, makeFormData({ title: "Sashimi" }));

      expect(result).toEqual({ message: "Category \"Sashimi\" created", type: "success" });
    });
  });
});

describe("updateCategory", () => {
  const fd = (overrides: Record<string, string> = {}): FormData =>
    makeFormData({ id: "1", ...overrides });

  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await updateCategory(null, fd());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("returns error when category is not found", async () => {
      jest.mocked(store.categories.getById).mockResolvedValue(null as never);

      const result = await updateCategory(null, fd({ id: "99" }));

      expect(result?.type).toBe("error");
      expect(result?.message).toContain("99");
    });
  });

  describe("success", () => {
    it("saves the updated title via the pipeline hset", async () => {
      const pipeline = makePipeline();

      jest.mocked(redis.pipeline).mockReturnValue(pipeline as never);
      await updateCategory(null, fd({ title: "Nigiri" }));

      expect(pipeline.hset).toHaveBeenCalledWith(
        "categories",
        expect.objectContaining({ "1": expect.stringContaining("Nigiri") }),
      );
      expect(pipeline.exec).toHaveBeenCalled();
    });

    it("revalidates both the categories list and the category detail page", async () => {
      await updateCategory(null, fd());
      expect(revalidatePath).toHaveBeenCalledWith("/admin/categories");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/category/1");
    });

    it("returns success with title in the message", async () => {
      const result = await updateCategory(null, fd({ title: "Uramaki" }));

      expect(result).toEqual({ message: "Category \"Uramaki\" updated", type: "success" });
    });
  });
});

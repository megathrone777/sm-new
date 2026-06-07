import { beforeEach, describe, expect, it } from "@jest/globals";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { store } from "@/store";

import { createProduct } from "../createProduct";
import { updateProduct } from "../updateProduct";

jest.mock("@/store", () => ({
  store: {
    categories: { getAll: jest.fn() },
    modifiers: { getAll: jest.fn() },
    products: { getAll: jest.fn(), getBySlug: jest.fn(), set: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("@vercel/blob", () => ({
  del: jest.fn().mockResolvedValue(undefined),
  put: jest.fn().mockResolvedValue({ url: "https://blob.vercel-storage.com/product.jpg" }),
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));
jest.mock("next/navigation", () => ({ redirect: jest.fn() }));

const makeCategory = (overrides: Partial<TProductCategory> = {}): TProductCategory => ({
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

const makeProduct = (overrides: Partial<TProduct> = {}): TProduct => ({
  allergens: null,
  categoryId: 1,
  composition: "Rice, salmon",
  description: null,
  fbCategoryId: null,
  fbDescription: null,
  fbUpload: false,
  freeCutleryCount: 0,
  googleCategoryId: null,
  id: 1,
  imageUrl: "",
  isAvailable: true,
  isMultipleModifiers: null,
  isPromotionActive: false,
  isTopProduct: false,
  modifiers: [],
  modifiersTitle: null,
  price: 199,
  promotionDiscountAmount: 0,
  promotionForEveryXProducts: 0,
  requiredCutlery: false,
  requiredModifier: false,
  slug: "salmon-roll",
  sortOrder: 1,
  title: "Salmon Roll",
  weight: "200g",
  ...overrides,
});

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const formData = new FormData();
  const defaults: Record<string, string> = {
    categoryId: "1",
    composition: "Rice, salmon",
    price: "199",
    title: "Salmon Roll",
    weight: "200g",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    formData.set(k, v);
  }

  return formData;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.products.set).mockResolvedValue(undefined);
  jest.mocked(store.products.getAll).mockResolvedValue([] as never);
  jest.mocked(store.products.getBySlug).mockResolvedValue(makeProduct());
  jest.mocked(store.modifiers.getAll).mockResolvedValue([] as never);
  jest.mocked(store.categories.getAll).mockResolvedValue([makeCategory()] as never);
});

describe("createProduct", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await createProduct(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.products.set).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await createProduct(null, makeFormData({ title: "" }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
    });

    it("returns error when categoryId does not match an existing category", async () => {
      const result = await createProduct(null, makeFormData({ categoryId: "99" }));

      expect(result).toEqual({ message: "Invalid category", type: "error" });
    });
  });

  describe("success", () => {
    it("assigns id=1 and sortOrder=1 when there are no existing products", async () => {
      jest.mocked(store.products.getAll).mockResolvedValue([]);
      await createProduct(null, makeFormData());

      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, sortOrder: 1 }),
      );
    });

    it("assigns id and sortOrder = max existing + 1", async () => {
      jest
        .mocked(store.products.getAll)
        .mockResolvedValue([
          makeProduct({ id: 4, sortOrder: 3 }),
          makeProduct({ id: 7, slug: "other", sortOrder: 8 }),
        ] as never);

      await createProduct(null, makeFormData({ title: "New Roll" }));

      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ id: 8, sortOrder: 9 }),
      );
    });

    it("de-duplicates slug by appending a counter when slug already exists", async () => {
      jest
        .mocked(store.products.getAll)
        .mockResolvedValue([makeProduct({ slug: "salmon-roll" })] as never);

      await createProduct(null, makeFormData({ title: "Salmon Roll" }));

      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ slug: "salmon-roll-2" }),
      );
    });

    it("sets isAvailable=true when checkbox is on", async () => {
      const fd = makeFormData();

      fd.set("isAvailable", "on");
      await createProduct(null, fd);

      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ isAvailable: true }),
      );
    });

    it("sets isAvailable=false when checkbox is absent", async () => {
      await createProduct(null, makeFormData());

      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ isAvailable: false }),
      );
    });

    it("uploads blob and saves URL when an image file is provided", async () => {
      const fd = makeFormData();

      fd.set("image", new File(["data"], "product.jpg", { type: "image/jpeg" }));
      await createProduct(null, fd);
      expect(put).toHaveBeenCalled();

      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ imageUrl: "https://blob.vercel-storage.com/product.jpg" }),
      );
    });

    it("sets imageUrl to empty string when no image is attached", async () => {
      await createProduct(null, makeFormData());

      expect(store.products.set).toHaveBeenCalledWith(expect.objectContaining({ imageUrl: "" }));
    });

    it("revalidates the admin products page", async () => {
      await createProduct(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/products");
    });

    it("redirects to the new product admin page", async () => {
      await createProduct(null, makeFormData({ title: "Tuna Roll" }));

      expect(redirect).toHaveBeenCalledWith(expect.stringContaining("/admin/product/"));
    });
  });
});

describe("updateProduct", () => {
  const fd = (overrides: Record<string, string> = {}): FormData =>
    makeFormData({ slug: "salmon-roll", ...overrides });

  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateProduct(null, fd());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("returns error when product slug is not found", async () => {
      jest.mocked(store.products.getBySlug).mockResolvedValue(null);

      const result = await updateProduct(null, fd({ slug: "ghost-product" }));

      expect(result?.type).toBe("error");
      expect(result?.message).toContain("ghost-product");
    });
  });

  describe("success", () => {
    it("merges updated fields with the existing product", async () => {
      await updateProduct(null, fd({ price: "299", title: "Premium Roll" }));

      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ price: 299, title: "Premium Roll" }),
      );
    });

    it("uploads blob and updates imageUrl when an image file is provided", async () => {
      const formData = fd();

      formData.set("image", new File(["data"], "new.jpg", { type: "image/jpeg" }));

      await updateProduct(null, formData);

      expect(put).toHaveBeenCalled();
      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ imageUrl: "https://blob.vercel-storage.com/product.jpg" }),
      );
    });

    it("skips blob upload and keeps existing imageUrl when no image is attached", async () => {
      jest
        .mocked(store.products.getBySlug)
        .mockResolvedValue(
          makeProduct({ imageUrl: "https://blob.vercel-storage.com/old.jpg" }),
        );

      await updateProduct(null, fd());

      expect(put).not.toHaveBeenCalled();
      expect(store.products.set).toHaveBeenCalledWith(
        expect.objectContaining({ imageUrl: "https://blob.vercel-storage.com/old.jpg" }),
      );
    });

    it("revalidates the product detail admin page", async () => {
      await updateProduct(null, fd());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/product/salmon-roll");
    });

    it("returns success with title in the message", async () => {
      const result = await updateProduct(null, fd({ title: "New Roll" }));

      expect(result).toEqual({ message: "Product \"New Roll\" updated", type: "success" });
    });
  });
});

import { beforeEach, describe, expect, it } from "@jest/globals";

import { store } from "@/store";

import { addToCart } from "../addToCart";
import { saveCart } from "../saveCart";

jest.mock("@/store", () => ({
  store: {
    cart: {
      get: jest.fn(),
      getOrCreateSessionId: jest.fn(),
      set: jest.fn(),
    },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

jest.mock("../saveCart", () => ({ saveCart: jest.fn() }));

jest.mock("../validateNewProduct", () => ({
  validateNewProduct: jest.fn().mockResolvedValue({ message: "Přidáno", type: "success" }),
}));

const makeProduct = (overrides: Partial<TProduct> = {}): TProduct => ({
  allergens: null,
  categoryId: 1,
  composition: "salmon, rice",
  description: null,
  fbDescription: null,
  fbUpload: false,
  freeCutleryCount: 0,
  id: 1,
  imageUrl: "/img.jpg",
  isAvailable: true,
  isMultipleModifiers: null,
  isPromotionActive: false,
  isTopProduct: false,
  modifiers: [],
  modifiersTitle: null,
  price: 200,
  promotionDiscountAmount: 0,
  promotionForEveryXProducts: 0,
  requiredCutlery: false,
  requiredModifier: false,
  slug: "assorti-trend-2",
  sortOrder: 1,
  title: "Assorti - Trend 2",
  weight: "32ks. / 1030g.",
  ...overrides,
});

const makeCartProduct = (overrides: Partial<TCartProduct> = {}): TCartProduct => ({
  ...makeProduct(),
  modifiers: [],
  quantity: 1,
  totalPrice: 200,
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.cart.getOrCreateSessionId).mockResolvedValue("session-abc" as never);
});

describe("addToCart", () => {
  describe("when cart is empty", () => {
    it("creates a new cart with the product when no cart exists", async () => {
      jest.mocked(store.cart.get).mockResolvedValue(null as never);
      const product = makeCartProduct();

      await addToCart(null, product);

      expect(saveCart).toHaveBeenCalledWith(expect.objectContaining({ products: [product] }));
    });
  });

  describe("product merging", () => {
    it("increments quantity when the identical product is added again", async () => {
      const existing = makeCartProduct({ quantity: 1, totalPrice: 200 });

      jest.mocked(store.cart.get).mockResolvedValue({ products: [existing] } as never);

      await addToCart(null, makeCartProduct());

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [expect.objectContaining({ quantity: 2, totalPrice: 400 })],
        }),
      );
    });

    it("adds a separate entry when a different product is added", async () => {
      const existing = makeCartProduct({ id: 1, slug: "product-a" });

      jest.mocked(store.cart.get).mockResolvedValue({ products: [existing] } as never);

      const newProduct = makeCartProduct({ id: 2, slug: "product-b" });

      await addToCart(null, newProduct);

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({ products: expect.arrayContaining([existing, newProduct]) }),
      );
    });

    it("treats product added from list (modifiersTitle null) and from product page (modifiersTitle string) as the same item", async () => {
      const fromList = makeCartProduct({ modifiersTitle: null, quantity: 1, totalPrice: 200 });

      jest.mocked(store.cart.get).mockResolvedValue({ products: [fromList] } as never);

      const fromPage = makeCartProduct({
        modifiersTitle: "Modifikátory",
        quantity: 1,
        totalPrice: 200,
      });

      await addToCart(null, fromPage);

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [expect.objectContaining({ quantity: 2, totalPrice: 400 })],
        }),
      );
    });

    it("treats product added from product page (modifiersTitle string) and then from list (modifiersTitle null) as the same item", async () => {
      const fromPage = makeCartProduct({
        modifiersTitle: "Modifikátory",
        quantity: 1,
        totalPrice: 200,
      });

      jest.mocked(store.cart.get).mockResolvedValue({ products: [fromPage] } as never);

      const fromList = makeCartProduct({ modifiersTitle: null, quantity: 1, totalPrice: 200 });

      await addToCart(null, fromList);

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [expect.objectContaining({ quantity: 2, totalPrice: 400 })],
        }),
      );
    });

    it("keeps products with different selected modifiers as separate cart entries", async () => {
      const withModifier = makeCartProduct({
        modifiers: [
          { id: 10, price: 50, requiredSubModifier: false, sortOrder: 1, title: "Extra spicy" },
        ],
        totalPrice: 250,
      });

      jest.mocked(store.cart.get).mockResolvedValue({ products: [withModifier] } as never);

      const withoutModifier = makeCartProduct({ modifiers: [], totalPrice: 200 });

      await addToCart(null, withoutModifier);

      const [saved] = jest.mocked(saveCart).mock.calls[0] as [Partial<TCart>];

      expect(saved.products).toHaveLength(2);
    });
  });

  describe("authorization", () => {
    it("returns an error when there is no session", async () => {
      jest.mocked(store.cart.getOrCreateSessionId).mockResolvedValue(null as never);

      const result = await addToCart(null, makeCartProduct());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(saveCart).not.toHaveBeenCalled();
    });
  });
});

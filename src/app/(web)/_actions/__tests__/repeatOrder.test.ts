import { beforeEach, describe, expect, it } from "@jest/globals";

import { store } from "@/store";

import { repeatOrder } from "../repeatOrder";
import { saveCart } from "../saveCart";

jest.mock("@/store", () => ({
  store: {
    cart: {
      getOrCreateSessionId: jest.fn(),
    },
    orders: {
      getById: jest.fn(),
    },
    products: {
      getAllRaw: jest.fn(),
    },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));
jest.mock("../saveCart", () => ({ saveCart: jest.fn() }));

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
  slug: "product-a",
  sortOrder: 1,
  title: "Product A",
  weight: "200g",
  ...overrides,
});

const makeOrderProduct = (overrides: Partial<TOrderProduct> = {}): TOrderProduct => ({
  ...makeProduct(),
  modifiers: [],
  quantity: 2,
  totalPrice: 400,
  ...overrides,
});

const makeOrder = (overrides: Partial<TOrder> = {}): TOrder => ({
  additionals: [],
  clientEmail: "test@example.com",
  clientName: "Test User",
  clientOrdersCount: 1,
  clientPhoneNumber: "420775123456",
  comgateProcessedAt: "",
  comgateTransId: "",
  courier: "",
  createdAt: "2026-01-01T10:00:00Z",
  cutleryCount: 0,
  cutleryCountToPay: 0,
  cutleryPrice: 0,
  deliveryAddress: "Test Street 1",
  deliveryAddressDistrict: "",
  deliveryCoordinates: "",
  deliveryDistance: 0,
  deliveryPrice: 0,
  deliveryTime: "",
  deliveryTitle: "",
  deliveryType: "delivery",
  id: 42,
  note: "",
  onlinePaymentStatus: null,
  paymentType: "cash",
  products: [makeOrderProduct()],
  promocode: "",
  promocodeDiscountPrice: 0,
  status: "done",
  timeout: 0,
  tipsAmount: 0,
  tipsPrice: 0,
  totalAdditionalsPrice: 0,
  totalPrice: 400,
  totalProductsPrice: 400,
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.cart.getOrCreateSessionId).mockResolvedValue("session-abc");
  jest.mocked(store.orders.getById).mockResolvedValue(makeOrder());

  jest.mocked(store.products.getAllRaw).mockResolvedValue({
    "product-a": makeProduct(),
  });
});

describe("repeatOrder", () => {
  describe("authorization", () => {
    it("returns an error when there is no session", async () => {
      jest.mocked(store.cart.getOrCreateSessionId).mockResolvedValue("");

      const result = await repeatOrder(42);

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(saveCart).not.toHaveBeenCalled();
    });
  });

  describe("order validation", () => {
    it("returns an error when the order does not exist", async () => {
      jest.mocked(store.orders.getById).mockResolvedValue(null);

      const result = await repeatOrder(999);

      expect(result).toEqual({ message: "Objednávka nenalezena", type: "error" });
      expect(saveCart).not.toHaveBeenCalled();
    });

    it("returns an error when the order has no products", async () => {
      jest.mocked(store.orders.getById).mockResolvedValue(makeOrder({ products: [] }));

      const result = await repeatOrder(42);

      expect(result).toEqual({ message: "Objednávka neobsahuje produkty", type: "error" });
      expect(saveCart).not.toHaveBeenCalled();
    });

    it("returns an error when a product is no longer available", async () => {
      jest.mocked(store.products.getAllRaw).mockResolvedValue({
        "product-a": makeProduct({ isAvailable: false }),
      });

      const result = await repeatOrder(42);

      expect(result.type).toBe("error");
      expect(result.message).toContain("Product A");
      expect(saveCart).not.toHaveBeenCalled();
    });

    it("returns an error when a product has been removed from the menu", async () => {
      jest.mocked(store.products.getAllRaw).mockResolvedValue({});

      const result = await repeatOrder(42);

      expect(result.type).toBe("error");
      expect(saveCart).not.toHaveBeenCalled();
    });
  });

  describe("successful repeat", () => {
    it("saves cart with products from the order", async () => {
      const result = await repeatOrder(42);

      expect(result).toEqual({ message: "Produkty přidány do košíku", type: "success" });
      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [
            expect.objectContaining({
              quantity: 2,
              slug: "product-a",
              totalPrice: 400,
            }),
          ],
        }),
      );
    });

    it("recalculates totalPrice using current product price", async () => {
      jest.mocked(store.products.getAllRaw).mockResolvedValue({
        "product-a": makeProduct({ price: 250 }),
      });

      await repeatOrder(42);

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [expect.objectContaining({ totalPrice: 500 })],
        }),
      );
    });

    it("preserves modifiers from the original order", async () => {
      const modifier: TCartModifier = {
        id: 10,
        price: 30,
        requiredSubModifier: false,
        sortOrder: 1,
        title: "Extra wasabi",
      };

      jest.mocked(store.orders.getById).mockResolvedValue(
        makeOrder({
          products: [makeOrderProduct({ modifiers: [modifier], quantity: 1, totalPrice: 230 })],
        }),
      );

      await repeatOrder(42);

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          products: [
            expect.objectContaining({
              modifiers: [modifier],
              totalPrice: 230,
            }),
          ],
        }),
      );
    });

    it("resets cart fields to defaults when repeating", async () => {
      await repeatOrder(42);

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          additionals: [],
          note: "",
          promo: { code: "", discount: 0 },
        }),
      );
    });
  });
});

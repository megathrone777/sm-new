import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "../saveCart";
import { validateAndSubmitCart } from "../validateAndSubmitCart";

jest.mock("@/store", () => ({
  realtime: { emit: jest.fn() },
  store: {
    cart: { get: jest.fn(), getSessionId: jest.fn() },
    deliveryConditions: { getAll: jest.fn() },
    orders: { getExistingOrder: jest.fn(), registerNewOrder: jest.fn() },
    shop: { getSettings: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

jest.mock("next/navigation", () => ({
  redirect: jest.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({ delete: jest.fn() })),
}));

jest.mock("next/server", () => ({
  after: jest.fn((fn: () => void) => fn()),
}));

jest.mock("@/services", () => ({
  sendOrderCreatedSms: jest.fn(),
  sendOrderEmail: jest.fn(),
}));

jest.mock("../saveCart", () => ({ saveCart: jest.fn() }));

const makeCart = (overrides: Partial<TCart> = {}): TCart => ({
  additionals: [],
  categoryDiscount: 0,
  client: { email: "jan@example.com", name: "Jan Novák", phoneNumber: "420737123456" },
  cutlery: { quantity: 2, totalPrice: 0 },
  delivery: {
    address: "Karlova 15",
    conditions: [],
    distanceInM: 1000,
    position: [],
    price: 49,
    title: "",
    type: "delivery",
  },
  errors: {},
  note: "",
  payment: { change: null, type: "cash" },
  products: [{ freeCutleryCount: 1, quantity: 1, totalPrice: 280 }] as unknown as TCartProduct[],
  promo: { code: "", discount: 0 },
  time: { label: "", value: null },
  tips: { percentage: 0, price: 0 },
  totalPrice: 329,
  ...overrides,
});

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    change: "2000",
    email: "jan@example.com",
    name: "Jan Novák",
    note: "",
    payment: "cash",
    phone: "420737123456",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.cart.getSessionId).mockResolvedValue("session-abc");
  jest.mocked(store.cart.get).mockResolvedValue(makeCart());

  jest.mocked(store.deliveryConditions.getAll).mockResolvedValue([
    {
      distanceFrom: 0,
      distanceTo: 5000,
      id: 1,
      minimumOrderPrice: 200,
      price: 49,
      text: "",
      title: "",
    },
  ] as never);
  jest.mocked(store.shop.getSettings).mockResolvedValue({ lastTimeForPickup: "23:00" } as never);
  jest.mocked(store.orders.getExistingOrder).mockResolvedValue({
    existingOrderIds: [],
    id: "42",
  } as never);
  jest.mocked(store.orders.registerNewOrder).mockResolvedValue(undefined);
});

describe("validateAndSubmitCart", () => {
  describe("when cart is missing", () => {
    it("returns null immediately without creating an order", async () => {
      jest.mocked(store.cart.getSessionId).mockResolvedValue(null);
      jest.mocked(store.cart.get).mockResolvedValue(null);

      const result = await validateAndSubmitCart(null, makeFormData());

      expect(result).toBeNull();
      expect(store.orders.registerNewOrder).not.toHaveBeenCalled();
    });
  });

  describe("validation errors", () => {
    it("fails with a cutlery error when cutlery quantity is 0", async () => {
      jest
        .mocked(store.cart.get)
        .mockResolvedValue(makeCart({ cutlery: { quantity: 0, totalPrice: 0 } }));

      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:/cart");
      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.objectContaining({ cutlery: expect.any(String) }),
        }),
      );
      expect(revalidatePath).toHaveBeenCalledWith("/cart");
    });

    it("fails with a name error when name field is empty", async () => {
      await expect(validateAndSubmitCart(null, makeFormData({ name: "" }))).rejects.toThrow(
        "REDIRECT:/cart",
      );

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.objectContaining({ name: expect.any(String) }) }),
      );
    });

    it("fails with an email error when email field is empty", async () => {
      await expect(validateAndSubmitCart(null, makeFormData({ email: "" }))).rejects.toThrow(
        "REDIRECT:/cart",
      );

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.objectContaining({ email: expect.any(String) }) }),
      );
    });

    it("fails with an email error when email format is invalid", async () => {
      await expect(
        validateAndSubmitCart(null, makeFormData({ email: "not-an-email" })),
      ).rejects.toThrow("REDIRECT:/cart");

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.objectContaining({ email: expect.any(String) }) }),
      );
    });

    it("fails with a phone error when phone is too short (under 7 digits)", async () => {
      await expect(validateAndSubmitCart(null, makeFormData({ phone: "123" }))).rejects.toThrow(
        "REDIRECT:/cart",
      );

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.objectContaining({ phone: expect.any(String) }) }),
      );
    });

    it("fails with an address error when delivery address is missing", async () => {
      jest.mocked(store.cart.get).mockResolvedValue(
        makeCart({
          delivery: {
            address: "",
            conditions: [],
            distanceInM: 0,
            position: [],
            price: null,
            title: "",
            type: "delivery",
          },
        }),
      );

      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:/cart");

      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.objectContaining({ addressFormat: expect.any(String) }),
        }),
      );
    });

    it("fails with a delivery error when total price is below the zone minimum", async () => {
      jest.mocked(store.cart.get).mockResolvedValue(makeCart({ totalPrice: 100 }));

      jest.mocked(store.deliveryConditions.getAll).mockResolvedValue([
        {
          distanceFrom: 0,
          distanceTo: 5000,
          id: 1,
          minimumOrderPrice: 500,
          price: 49,
          text: "Minimum order 500 Kč",
          title: "",
        },
      ]);

      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:/cart");
      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.objectContaining({ delivery: "Minimum order 500 Kč" }),
        }),
      );
    });

    it("fails with address-range error when delivery distance is outside all zones", async () => {
      jest.mocked(store.cart.get).mockResolvedValue(
        makeCart({
          delivery: {
            address: "Outskirts 42",
            conditions: [],
            distanceInM: 99000,
            position: [],
            price: null,
            title: "",
            type: "delivery",
          },
        }),
      );

      jest.mocked(store.deliveryConditions.getAll).mockResolvedValue([
        {
          distanceFrom: 0,
          distanceTo: 5000,
          id: 1,
          minimumOrderPrice: 200,
          price: 49,
          text: "",
          title: "",
        },
      ]);

      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:/cart");
      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.objectContaining({ addressRange: expect.any(String) }),
        }),
      );
    });

    it("does NOT save errors and does NOT redirect to /cart when all fields are valid", async () => {
      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow(
        "REDIRECT:/order-confirmed/42",
      );

      expect(saveCart).toHaveBeenCalledWith(expect.objectContaining({ errors: {} }));
    });
  });

  describe("successful order creation", () => {
    it("registers the order exactly once when validation passes", async () => {
      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:");
      expect(store.orders.registerNewOrder).toHaveBeenCalledTimes(1);
    });

    it("redirects to /order-confirmed/{id} for cash payment", async () => {
      await expect(validateAndSubmitCart(null, makeFormData({ payment: "cash" }))).rejects.toThrow(
        "REDIRECT:/order-confirmed/42",
      );
    });

    it("redirects to /payment-gateway/{id} for card payment", async () => {
      jest
        .mocked(store.cart.get)
        .mockResolvedValue(makeCart({ payment: { change: null, type: "card" } }));

      await expect(validateAndSubmitCart(null, makeFormData({ payment: "card" }))).rejects.toThrow(
        "REDIRECT:/payment-gateway/42",
      );
    });

    it("puts the correct client name and email from FormData into the order", async () => {
      await expect(
        validateAndSubmitCart(null, makeFormData({ email: "petr@test.cz", name: "Petr Dvořák" })),
      ).rejects.toThrow("REDIRECT:");

      const [order] = jest.mocked(store.orders.registerNewOrder).mock.calls[0] as [TOrder, string];

      expect(order.clientName).toBe("Petr Dvořák");
      expect(order.clientEmail).toBe("petr@test.cz");
    });

    it("sets order status to 'new'", async () => {
      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:");

      const [order] = jest.mocked(store.orders.registerNewOrder).mock.calls[0] as [TOrder, string];

      expect(order.status).toBe("new");
    });

    it("appends cash-change notice to the order note for cash payment", async () => {
      await expect(
        validateAndSubmitCart(
          null,
          makeFormData({ change: "2000", note: "Extra sauce please", payment: "cash" }),
        ),
      ).rejects.toThrow("REDIRECT:");

      const [order] = jest.mocked(store.orders.registerNewOrder).mock.calls[0] as [TOrder, string];

      expect(order.note).toContain("Extra sauce please");
      expect(order.note).toContain("2000 Kč");
    });
  });
});

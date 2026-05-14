// @vitest-environment node
// ─── LESSON 4: Testing async server actions with mocked dependencies ──────────
//
// Server actions depend on Redis (store), Next.js APIs (cookies, redirect),
// and external services (email, SMS). None of those should run in tests.
//
// vi.mock(module, factory) — replaces an entire module with your fake version.
// vi.fn()                  — creates a spy function you can inspect later.
// mockResolvedValue(x)     — makes an async fn resolve with x.
// expect(fn).toHaveBeenCalledWith(args) — checks the fn was called correctly.
//
// Important: vi.mock() calls are hoisted to the top of the file by Vitest,
// so the order you write them in doesn't matter.
// ─────────────────────────────────────────────────────────────────────────────
import { revalidatePath } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { store } from "@/store";

import { saveCart } from "../saveCart";
import { validateAndSubmitCart } from "../validateAndSubmitCart";

// ─── Module mocks ─────────────────────────────────────────────────────────────

vi.mock("@/store", () => ({
  realtime: { emit: vi.fn() },
  store: {
    cart: { get: vi.fn(), getSessionId: vi.fn() },
    deliveryConditions: { getAll: vi.fn() },
    orders: { getExistingOrder: vi.fn(), registerNewOrder: vi.fn() },
    shop: { getSettings: vi.fn() },
  },
}));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

// In real Next.js, redirect() throws an internal NEXT_REDIRECT error.
// We mimic that so execution stops — just like in production.
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({ delete: vi.fn() })),
}));

vi.mock("next/server", () => ({
  // after() schedules work for after the response is sent; run it immediately here
  after: vi.fn((fn: () => void) => fn()),
}));

vi.mock("@/services", () => ({
  sendOrderCreatedSms: vi.fn(),
  sendOrderEmail: vi.fn(),
}));

vi.mock("../saveCart", () => ({ saveCart: vi.fn() }));

// ─── Test data factories ──────────────────────────────────────────────────────

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

// ─── Default store behaviour (happy path — override per test) ─────────────────

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(store.cart.getSessionId).mockResolvedValue("session-abc" as never);
  vi.mocked(store.cart.get).mockResolvedValue(makeCart() as never);
  vi.mocked(store.deliveryConditions.getAll).mockResolvedValue([
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
  vi.mocked(store.shop.getSettings).mockResolvedValue({ lastTimeForPickup: "23:00" } as never);
  vi.mocked(store.orders.getExistingOrder).mockResolvedValue({
    existingOrderIds: [],
    id: "42",
  } as never);
  vi.mocked(store.orders.registerNewOrder).mockResolvedValue(undefined as never);
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("validateAndSubmitCart", () => {
  describe("when cart is missing", () => {
    it("returns null immediately without creating an order", async () => {
      vi.mocked(store.cart.getSessionId).mockResolvedValue(null as never);
      vi.mocked(store.cart.get).mockResolvedValue(null as never);

      const result = await validateAndSubmitCart(null, makeFormData());

      expect(result).toBeNull();
      expect(store.orders.registerNewOrder).not.toHaveBeenCalled();
    });
  });

  // ── Validation errors ──────────────────────────────────────────────────────
  //
  // When validation fails, the action:
  //   1. Saves the errors into the cart (so the form can show them)
  //   2. Calls revalidatePath('/cart') to refresh server data
  //   3. Calls redirect('/cart') which throws — halting execution
  //
  // In tests, we assert that redirect WAS called by expecting the thrown error.

  describe("validation errors", () => {
    it("fails with a cutlery error when cutlery quantity is 0", async () => {
      vi.mocked(store.cart.get).mockResolvedValue(
        makeCart({ cutlery: { quantity: 0, totalPrice: 0 } }) as never,
      );

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
      vi.mocked(store.cart.get).mockResolvedValue(
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
        }) as never,
      );

      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:/cart");
      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.objectContaining({ addressFormat: expect.any(String) }),
        }),
      );
    });

    it("fails with a delivery error when total price is below the zone minimum", async () => {
      vi.mocked(store.cart.get).mockResolvedValue(makeCart({ totalPrice: 100 }) as never);
      vi.mocked(store.deliveryConditions.getAll).mockResolvedValue([
        {
          distanceFrom: 0,
          distanceTo: 5000,
          id: 1,
          minimumOrderPrice: 500,
          price: 49,
          text: "Minimum order 500 Kč",
          title: "",
        },
      ] as never);

      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:/cart");
      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.objectContaining({ delivery: "Minimum order 500 Kč" }),
        }),
      );
    });

    it("fails with address-range error when delivery distance is outside all zones", async () => {
      vi.mocked(store.cart.get).mockResolvedValue(
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
        }) as never,
      );
      vi.mocked(store.deliveryConditions.getAll).mockResolvedValue([
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

      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:/cart");
      expect(saveCart).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: expect.objectContaining({ addressRange: expect.any(String) }),
        }),
      );
    });

    it("does NOT save errors and does NOT redirect to /cart when all fields are valid", async () => {
      // On success the action still calls redirect('/order-confirmed/...'),
      // which throws our mock error — just not '/cart'.
      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow(
        "REDIRECT:/order-confirmed/42",
      );

      expect(saveCart).not.toHaveBeenCalled();
    });
  });

  // ── Successful order creation ──────────────────────────────────────────────

  describe("successful order creation", () => {
    it("registers the order exactly once when validation passes", async () => {
      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:");

      expect(store.orders.registerNewOrder).toHaveBeenCalledOnce();
    });

    it("redirects to /order-confirmed/{id} for cash payment", async () => {
      await expect(validateAndSubmitCart(null, makeFormData({ payment: "cash" }))).rejects.toThrow(
        "REDIRECT:/order-confirmed/42",
      );
    });

    it("redirects to /payment-gateway/{id} for card payment", async () => {
      vi.mocked(store.cart.get).mockResolvedValue(
        makeCart({ payment: { change: null, type: "card" } }) as never,
      );

      await expect(validateAndSubmitCart(null, makeFormData({ payment: "card" }))).rejects.toThrow(
        "REDIRECT:/payment-gateway/42",
      );
    });

    it("puts the correct client name and email from FormData into the order", async () => {
      await expect(
        validateAndSubmitCart(null, makeFormData({ email: "petr@test.cz", name: "Petr Dvořák" })),
      ).rejects.toThrow("REDIRECT:");

      const [order] = vi.mocked(store.orders.registerNewOrder).mock.calls[0] as [TOrder, string];

      expect(order.clientName).toBe("Petr Dvořák");
      expect(order.clientEmail).toBe("petr@test.cz");
    });

    it("sets order status to 'new'", async () => {
      await expect(validateAndSubmitCart(null, makeFormData())).rejects.toThrow("REDIRECT:");

      const [order] = vi.mocked(store.orders.registerNewOrder).mock.calls[0] as [TOrder, string];

      expect(order.status).toBe("new");
    });

    it("appends cash-change notice to the order note for cash payment", async () => {
      // Note comes from FormData, not the cart. The action appends a cash-change
      // message to it when payment type is "cash" and change amount is selected.
      await expect(
        validateAndSubmitCart(
          null,
          makeFormData({ change: "2000", note: "Extra sauce please", payment: "cash" }),
        ),
      ).rejects.toThrow("REDIRECT:");

      const [order] = vi.mocked(store.orders.registerNewOrder).mock.calls[0] as [TOrder, string];

      expect(order.note).toContain("Extra sauce please");
      expect(order.note).toContain("2000 Kč");
    });
  });
});

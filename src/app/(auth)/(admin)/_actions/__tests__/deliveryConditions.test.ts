import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { createDeliveryCondition } from "../createDeliveryCondition";
import { updateDeliveryCondition } from "../updateDeliveryCondition";

jest.mock("@/store", () => ({
  store: {
    deliveryConditions: { getAll: jest.fn(), set: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeCondition = (overrides: Partial<TDeliveryCondition> = {}): TDeliveryCondition => ({
  distanceFrom: 0,
  distanceTo: 5000,
  id: 1,
  minimumOrderPrice: 200,
  price: 49,
  text: "Do 5 km",
  title: "Zóna 1",
  ...overrides,
});

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    distanceFrom: "0",
    distanceTo: "5000",
    minimumOrderPrice: "200",
    price: "49",
    text: "Do 5 km",
    title: "Zóna 1",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.deliveryConditions.set).mockResolvedValue(undefined as never);
  jest.mocked(store.deliveryConditions.getAll).mockResolvedValue([] as never);
});

describe("createDeliveryCondition", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await createDeliveryCondition(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.deliveryConditions.set).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await createDeliveryCondition(null, makeFormData({ title: "" }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
    });

    it("returns error when distanceTo <= distanceFrom", async () => {
      const result = await createDeliveryCondition(
        null,
        makeFormData({ distanceFrom: "5000", distanceTo: "3000" }),
      );

      expect(result).toEqual({
        message: "distanceTo must be greater than distanceFrom",
        type: "error",
      });
    });

    it("returns error when distanceTo equals distanceFrom", async () => {
      const result = await createDeliveryCondition(
        null,
        makeFormData({ distanceFrom: "3000", distanceTo: "3000" }),
      );

      expect(result).toEqual({
        message: "distanceTo must be greater than distanceFrom",
        type: "error",
      });
    });

    it("returns error when distance range overlaps an existing condition", async () => {
      jest
        .mocked(store.deliveryConditions.getAll)
        .mockResolvedValue([makeCondition({ distanceFrom: 3000, distanceTo: 8000, title: "Zóna 2" })] as never);

      const result = await createDeliveryCondition(
        null,
        makeFormData({ distanceFrom: "0", distanceTo: "5000" }),
      );

      expect(result.type).toBe("error");
      expect(result.message).toContain("Zóna 2");
    });
  });

  describe("success", () => {
    it("saves the condition with all numeric fields parsed", async () => {
      await createDeliveryCondition(
        null,
        makeFormData({ minimumOrderPrice: "300", price: "79" }),
      );

      expect(store.deliveryConditions.set).toHaveBeenCalledWith(
        expect.objectContaining({ minimumOrderPrice: 300, price: 79 }),
      );
    });

    it("revalidates the admin delivery conditions page", async () => {
      await createDeliveryCondition(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/deliveryConditions");
    });

    it("returns success with title in the message", async () => {
      const result = await createDeliveryCondition(null, makeFormData({ title: "Zóna 1" }));

      expect(result).toEqual({
        message: "Delivery condition \"Zóna 1\" created",
        type: "success",
      });
    });
  });
});

describe("updateDeliveryCondition", () => {
  const fd = (overrides: Record<string, string> = {}): FormData =>
    makeFormData({ id: "1", ...overrides });

  beforeEach(() => {
    jest.mocked(store.deliveryConditions.getAll).mockResolvedValue(
      [makeCondition()] as never,
    );
  });

  describe("validation", () => {
    it("returns error when id is 0", async () => {
      const result = await updateDeliveryCondition(null, makeFormData({ id: "0" }));

      expect(result).toEqual({ message: "Id is required", type: "error" });
    });

    it("returns error when title is empty", async () => {
      const result = await updateDeliveryCondition(null, fd({ title: "" }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
    });

    it("returns error when range overlaps a different condition", async () => {
      jest.mocked(store.deliveryConditions.getAll).mockResolvedValue([
        makeCondition({ distanceFrom: 0, distanceTo: 5000, id: 1 }),
        makeCondition({ distanceFrom: 3000, distanceTo: 8000, id: 2, title: "Zóna 2" }),
      ] as never);

      const result = await updateDeliveryCondition(
        null,
        fd({ distanceFrom: "4000", distanceTo: "9000", id: "1" }),
      );

      expect(result.type).toBe("error");
      expect(result.message).toContain("Zóna 2");
    });

    it("does not flag overlap with itself", async () => {
      jest.mocked(store.deliveryConditions.getAll).mockResolvedValue(
        [makeCondition({ distanceFrom: 0, distanceTo: 5000, id: 1 })] as never,
      );

      const result = await updateDeliveryCondition(
        null,
        fd({ distanceFrom: "0", distanceTo: "5000", id: "1" }),
      );

      expect(result.type).toBe("success");
    });
  });

  describe("success", () => {
    it("saves all fields with correct types", async () => {
      await updateDeliveryCondition(null, fd({ price: "59", title: "Zóna 1 updated" }));

      expect(store.deliveryConditions.set).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, price: 59, title: "Zóna 1 updated" }),
      );
    });

    it("revalidates the admin delivery conditions page", async () => {
      await updateDeliveryCondition(null, fd());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/deliveryConditions");
    });
  });
});

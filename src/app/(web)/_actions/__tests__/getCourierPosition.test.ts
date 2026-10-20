import { beforeEach, describe, expect, it } from "@jest/globals";

import { store } from "@/store";
import { redis } from "@/store/redis";

import { getCourierPosition } from "../getCourierPosition";

jest.mock("@/store", () => ({ store: { orders: { getById: jest.fn() } } }));
jest.mock("@/store/redis", () => ({ redis: { get: jest.fn() } }));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getCourierPosition", () => {
  it("returns the courier's current coordinates from Redis", async () => {
    jest.mocked(store.orders.getById).mockResolvedValue({
      courier: "courier-1",
      deliveryType: "delivery",
      status: "took",
    } as TOrder);
    jest.mocked(redis.get).mockResolvedValue({
      heading: null,
      id: "courier-1",
      latitude: 50.1,
      longitude: 14.4,
      speed: null,
    });

    await expect(getCourierPosition(42)).resolves.toEqual({
      latitude: 50.1,
      longitude: 14.4,
    });
    expect(redis.get).toHaveBeenCalledWith("courier:courier-1");
  });

  it("returns null when no usable courier position is available", async () => {
    jest.mocked(store.orders.getById).mockResolvedValue(null);

    await expect(getCourierPosition(42)).resolves.toBeNull();
    expect(redis.get).not.toHaveBeenCalled();

    jest.mocked(store.orders.getById).mockResolvedValue({
      courier: "courier-1",
      deliveryType: "delivery",
      status: "took",
    } as TOrder);
    jest.mocked(redis.get).mockResolvedValue(null);

    await expect(getCourierPosition(42)).resolves.toBeNull();

    jest.mocked(redis.get).mockResolvedValue({
      heading: null,
      id: "courier-1",
      latitude: Number.NaN,
      longitude: 14.4,
      speed: null,
    });

    await expect(getCourierPosition(42)).resolves.toBeNull();
  });
});

import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { updateSmsTemplate } from "../updateSmsTemplate";

jest.mock("@/store", () => ({
  store: {
    sessions: { get: jest.fn() },
    smsTemplates: {
      set: jest.fn(),
      smsTemplateKeys: [
        "newOrderDelivery",
        "newOrderDeliveryCustomDeliveryTime",
        "newOrderPickup",
        "newOrderPickupCustomDeliveryTime",
        "orderIsOnTheWay",
        "orderIsReadyToPickup",
      ],
    },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    key: "newOrderDelivery",
    text: "Vaša objednávka č. {id} byla přijata.",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.smsTemplates.set).mockResolvedValue(undefined);
});

describe("updateSmsTemplate", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateSmsTemplate(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.smsTemplates.set).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error for an invalid template key", async () => {
      const result = await updateSmsTemplate(null, makeFormData({ key: "unknownKey" }));

      expect(result).toEqual({ message: "Invalid template key", type: "error" });
      expect(store.smsTemplates.set).not.toHaveBeenCalled();
    });

    it("returns error when text is empty", async () => {
      const result = await updateSmsTemplate(null, makeFormData({ text: "   " }));

      expect(result).toEqual({ message: "Template text is required", type: "error" });
      expect(store.smsTemplates.set).not.toHaveBeenCalled();
    });
  });

  describe("success", () => {
    it.each([
      "newOrderDelivery",
      "newOrderPickup",
      "orderIsOnTheWay",
      "orderIsReadyToPickup",
    ] as TSmsTemplateKey[])("accepts valid key %s", async (key) => {
      const result = await updateSmsTemplate(null, makeFormData({ key }));

      expect(result.type).toBe("success");
      expect(store.smsTemplates.set).toHaveBeenCalledWith(key, expect.any(String));
    });

    it("saves the trimmed text", async () => {
      await updateSmsTemplate(null, makeFormData({ text: "  Hello  " }));
      expect(store.smsTemplates.set).toHaveBeenCalledWith("newOrderDelivery", "Hello");
    });

    it("revalidates the admin notifications page", async () => {
      await updateSmsTemplate(null, makeFormData());
      expect(revalidatePath).toHaveBeenCalledWith("/admin/notifications");
    });

    it("returns success with key name in the message", async () => {
      const result = await updateSmsTemplate(null, makeFormData({ key: "newOrderDelivery" }));

      expect(result).toEqual({ message: "newOrderDelivery updated", type: "success" });
    });
  });
});

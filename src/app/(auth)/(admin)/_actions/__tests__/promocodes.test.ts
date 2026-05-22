import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { activatePromocode } from "../activatePromocode";
import { createPromocode } from "../createPromocode";
import { deletePromocode } from "../deletePromocode";
import { updatePromocode } from "../updatePromocode";

jest.mock("@/store", () => ({
  store: {
    promocodes: {
      delete: jest.fn(),
      getByCode: jest.fn(),
      set: jest.fn(),
      update: jest.fn(),
    },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const formData = new FormData();
  const defaults: Record<string, string> = {
    code: "SUMMER20",
    discount: "20",
    id: "SUMMER20",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    formData.set(k, v);
  }

  return formData;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.promocodes.set).mockResolvedValue(undefined as never);
  jest.mocked(store.promocodes.update).mockResolvedValue(undefined as never);
  jest.mocked(store.promocodes.delete).mockResolvedValue(undefined as never);
  jest.mocked(store.promocodes.getByCode).mockResolvedValue(null as never);
});

describe("createPromocode", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await createPromocode(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.promocodes.set).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when code is empty", async () => {
      const result = await createPromocode(null, makeFormData({ code: "" }));

      expect(result).toEqual({ message: "Code and discount are required", type: "error" });
    });

    it("returns error when discount is 0", async () => {
      const result = await createPromocode(null, makeFormData({ discount: "0" }));

      expect(result).toEqual({ message: "Code and discount are required", type: "error" });
    });

    it("returns error when code already exists", async () => {
      jest.mocked(store.promocodes.getByCode).mockResolvedValue({ code: "SUMMER20" } as never);

      const result = await createPromocode(null, makeFormData({ code: "summer20" }));

      expect(result.type).toBe("error");
      expect(result.message).toContain("SUMMER20");
    });
  });

  describe("success", () => {
    it("uppercases the code before saving", async () => {
      await createPromocode(null, makeFormData({ code: "hello" }));

      expect(store.promocodes.set).toHaveBeenCalledWith(expect.objectContaining({ code: "HELLO" }));
    });

    it("defaults type to reusable when oneTime is unchecked", async () => {
      await createPromocode(null, makeFormData());

      expect(store.promocodes.set).toHaveBeenCalledWith(
        expect.objectContaining({ type: "reusable" }),
      );
    });

    it("sets type to oneTime when oneTime checkbox is checked", async () => {
      const formData = makeFormData();

      formData.set("oneTime", "on");
      await createPromocode(null, formData);

      expect(store.promocodes.set).toHaveBeenCalledWith(
        expect.objectContaining({ type: "oneTime" }),
      );
    });

    it("starts appliedCount at 0 with empty orderIds", async () => {
      await createPromocode(null, makeFormData());

      expect(store.promocodes.set).toHaveBeenCalledWith(
        expect.objectContaining({ appliedCount: 0, orderIds: [] }),
      );
    });

    it("revalidates the admin promocodes page", async () => {
      await createPromocode(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/promocodes");
    });

    it("returns success with uppercased code in the message", async () => {
      const result = await createPromocode(null, makeFormData({ code: "vip10" }));

      expect(result).toEqual({
        message: "Promocode VIP10 successfully created",
        type: "success",
      });
    });
  });
});

describe("updatePromocode", () => {
  beforeEach(() => {
    jest.mocked(store.promocodes.getByCode).mockResolvedValue({ code: "SUMMER20" } as never);
  });

  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await updatePromocode(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("returns error when code is empty", async () => {
      const result = await updatePromocode(null, makeFormData({ code: "" }));

      expect(result).toEqual({ message: "Code and discount are required", type: "error" });
    });

    it("returns error when discount is 0", async () => {
      const result = await updatePromocode(null, makeFormData({ discount: "0" }));

      expect(result).toEqual({ message: "Code and discount are required", type: "error" });
    });

    it("returns error when code is not found", async () => {
      jest.mocked(store.promocodes.getByCode).mockResolvedValue(null as never);

      const result = await updatePromocode(null, makeFormData({ code: "NOTFOUND" }));

      expect(result.type).toBe("error");
      expect(result.message).toContain("NOTFOUND");
    });
  });

  describe("success", () => {
    it("passes isActive=1 when checkbox value is 'true'", async () => {
      await updatePromocode(null, makeFormData({ isActive: "true" }));

      expect(store.promocodes.update).toHaveBeenCalledWith(
        "SUMMER20",
        expect.objectContaining({ isActive: "1" }),
      );
    });

    it("passes isActive=0 when checkbox is absent", async () => {
      const formData = makeFormData();

      formData.delete("isActive");

      await updatePromocode(null, formData);

      expect(store.promocodes.update).toHaveBeenCalledWith(
        "SUMMER20",
        expect.objectContaining({ isActive: "0" }),
      );
    });

    it("revalidates the admin promocodes page", async () => {
      await updatePromocode(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/promocodes");
    });

    it("returns success with code in the message", async () => {
      const result = await updatePromocode(null, makeFormData());

      expect(result).toEqual({
        message: "Promocode SUMMER20 successfully updated",
        type: "success",
      });
    });
  });
});

describe("activatePromocode", () => {
  beforeEach(() => {
    jest.mocked(store.promocodes.getByCode).mockResolvedValue({ code: "SUMMER20" } as never);
  });

  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await activatePromocode(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("returns error when code is empty", async () => {
      const result = await activatePromocode(null, makeFormData({ code: "" }));

      expect(result).toEqual({ message: "Code is required", type: "error" });
    });

    it("returns error when code is not found", async () => {
      jest.mocked(store.promocodes.getByCode).mockResolvedValue(null as never);

      const result = await activatePromocode(null, makeFormData({ code: "GHOST" }));

      expect(result.type).toBe("error");
      expect(result.message).toContain("GHOST");
    });
  });

  describe("success", () => {
    it("activates immediately and returns 'is now active' when no activatedAt", async () => {
      const result = await activatePromocode(null, makeFormData());

      expect(result.type).toBe("success");
      expect(result.message).toContain("is now active");
      expect(store.promocodes.update).toHaveBeenCalledWith(
        "SUMMER20",
        expect.objectContaining({ isActive: "1" }),
      );
    });

    it("returns a scheduled message for a future activatedAt", async () => {
      const future = new Date(Date.now() + 86_400_000).toISOString();
      const result = await activatePromocode(null, makeFormData({ activatedAt: future }));

      expect(result.type).toBe("success");
      expect(result.message).toContain("scheduled");
    });

    it("revalidates the admin promocodes page", async () => {
      await activatePromocode(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/promocodes");
    });
  });
});

describe("deletePromocode", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await deletePromocode(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("returns error when id is empty", async () => {
      const result = await deletePromocode(null, makeFormData({ id: "" }));

      expect(result).toEqual({ message: "Code is required", type: "error" });
    });
  });

  describe("success", () => {
    it("deletes the promocode by uppercased id", async () => {
      await deletePromocode(null, makeFormData({ id: "summer20" }));

      expect(store.promocodes.delete).toHaveBeenCalledWith("SUMMER20");
    });

    it("revalidates the admin promocodes page", async () => {
      await deletePromocode(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/promocodes");
    });

    it("returns success with code in the message", async () => {
      const result = await deletePromocode(null, makeFormData({ id: "WINTER10" }));

      expect(result).toEqual({
        message: "Promocode WINTER10 successfully deleted",
        type: "success",
      });
    });
  });
});

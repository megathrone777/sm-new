import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { redis, store } from "@/store";

import { createModifier } from "../createModifier";
import { updateModifier } from "../updateModifier";

jest.mock("@/store", () => ({
  redis: { pipeline: jest.fn() },
  store: {
    modifiers: { set: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makePipeline = (
  execResult: [unknown, unknown] = [null, null],
): {
  exec: jest.Mock;
  hget: jest.Mock;
  hgetall: jest.Mock;
  hset: jest.Mock;
} => ({
  exec: jest.fn().mockResolvedValue(execResult),
  hget: jest.fn().mockReturnThis(),
  hgetall: jest.fn().mockReturnThis(),
  hset: jest.fn().mockReturnThis(),
});

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const formData = new FormData();
  const defaults: Record<string, string> = {
    price: "50",
    sortOrder: "1",
    title: "Extra sauce",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    formData.set(k, v);
  }

  return formData;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.modifiers.set).mockResolvedValue(undefined as never);
  jest.mocked(redis.pipeline).mockReturnValue(makePipeline() as never);
});

describe("createModifier", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await createModifier(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.modifiers.set).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await createModifier(null, makeFormData({ title: "" }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
    });
  });

  describe("success", () => {
    it("assigns id=1 when there are no existing modifiers", async () => {
      jest.mocked(redis.pipeline).mockReturnValue(makePipeline([null, null]) as never);

      await createModifier(null, makeFormData());

      expect(store.modifiers.set).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    });

    it("assigns id = max existing id + 1", async () => {
      const existingMap = { "3": { id: 3 }, "7": { id: 7 } };

      jest.mocked(redis.pipeline).mockReturnValue(makePipeline([existingMap, null]) as never);

      await createModifier(null, makeFormData());

      expect(store.modifiers.set).toHaveBeenCalledWith(expect.objectContaining({ id: 8 }));
    });

    it("parses price and sortOrder as numbers", async () => {
      await createModifier(null, makeFormData({ price: "75", sortOrder: "3" }));

      expect(store.modifiers.set).toHaveBeenCalledWith(
        expect.objectContaining({ price: 75, sortOrder: 3 }),
      );
    });

    it("sets requiredSubModifier=true when checkbox is on", async () => {
      const formData = makeFormData();

      formData.set("requiredSubModifier", "on");
      await createModifier(null, formData);

      expect(store.modifiers.set).toHaveBeenCalledWith(
        expect.objectContaining({ requiredSubModifier: true }),
      );
    });

    it("filters subModifiers from the pipeline result by id", async () => {
      const subsMap = {
        "1": { id: 1, title: "Sub A" },
        "2": { id: 2, title: "Sub B" },
      };

      jest.mocked(redis.pipeline).mockReturnValue(makePipeline([null, subsMap]) as never);

      const formData = makeFormData();

      formData.append("subModifierIds", "1");
      await createModifier(null, formData);

      expect(store.modifiers.set).toHaveBeenCalledWith(
        expect.objectContaining({ subModifiers: [{ id: 1, title: "Sub A" }] }),
      );
    });

    it("revalidates the admin modifiers page", async () => {
      await createModifier(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/modifiers");
    });

    it("returns success with title in the message", async () => {
      const result = await createModifier(null, makeFormData({ title: "Wasabi" }));

      expect(result).toEqual({
        message: "Modifier Wasabi successfully created",
        type: "success",
      });
    });
  });
});

describe("updateModifier", () => {
  const existingModifier = {
    id: 5,
    price: 30,
    requiredSubModifier: false,
    sortOrder: 1,
    subModifiers: [],
    title: "Old sauce",
  };

  const formData = (overrides: Record<string, string> = {}): FormData =>
    makeFormData({ id: "5", ...overrides });

  beforeEach(() => {
    jest.mocked(redis.pipeline).mockReturnValue(makePipeline([existingModifier, null]) as never);
  });

  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await updateModifier(null, formData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("returns error when modifier id is not found", async () => {
      jest.mocked(redis.pipeline).mockReturnValue(makePipeline([null, null]) as never);

      const result = await updateModifier(null, formData({ id: "99" }));

      expect(result.type).toBe("error");
      expect(result.message).toContain("99");
    });
  });

  describe("success", () => {
    it("merges updated fields with the existing modifier", async () => {
      await updateModifier(null, formData({ price: "60", title: "New sauce" }));

      expect(store.modifiers.set).toHaveBeenCalledWith(
        expect.objectContaining({ id: 5, price: 60, title: "New sauce" }),
      );
    });

    it("revalidates both the modifiers list and the modifier detail page", async () => {
      await updateModifier(null, formData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/modifiers");
      expect(revalidatePath).toHaveBeenCalledWith("/admin/modifier/5");
    });

    it("returns success with id in the message", async () => {
      const result = await updateModifier(null, formData());

      expect(result).toEqual({
        message: "Modifier #5 successfully updated",
        type: "success",
      });
    });
  });
});

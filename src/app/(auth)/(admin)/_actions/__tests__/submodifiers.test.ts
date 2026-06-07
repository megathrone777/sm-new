import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { createSubmodifier } from "../createSubmodifier";
import { updateSubmodifier } from "../updateSubmodifier";

jest.mock("@/store", () => ({
  store: {
    sessions: { get: jest.fn() },
    submodifiers: { getAll: jest.fn(), getById: jest.fn(), set: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    sortOrder: "1",
    title: "Extra spicy",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.submodifiers.set).mockResolvedValue(undefined);
  jest.mocked(store.submodifiers.getAll).mockResolvedValue([] as never);
  jest.mocked(store.submodifiers.getById).mockResolvedValue({
    id: 1,
    sortOrder: 1,
    title: "Extra spicy",
  });
});

describe("createSubmodifier", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await createSubmodifier(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.submodifiers.set).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await createSubmodifier(null, makeFormData({ title: "" }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
    });
  });

  describe("success", () => {
    it("assigns id=1 when there are no existing submodifiers", async () => {
      jest.mocked(store.submodifiers.getAll).mockResolvedValue([] as never);

      await createSubmodifier(null, makeFormData());

      expect(store.submodifiers.set).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    });

    it("assigns id = max existing id + 1", async () => {
      jest.mocked(store.submodifiers.getAll).mockResolvedValue([
        { id: 3, sortOrder: 1, title: "A" },
        { id: 7, sortOrder: 2, title: "B" },
      ] as never);

      await createSubmodifier(null, makeFormData());

      expect(store.submodifiers.set).toHaveBeenCalledWith(expect.objectContaining({ id: 8 }));
    });

    it("parses sortOrder as a number", async () => {
      await createSubmodifier(null, makeFormData({ sortOrder: "5" }));

      expect(store.submodifiers.set).toHaveBeenCalledWith(
        expect.objectContaining({ sortOrder: 5 }),
      );
    });

    it("revalidates the admin submodifiers page", async () => {
      await createSubmodifier(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/submodifiers");
    });

    it("returns success with title in the message", async () => {
      const result = await createSubmodifier(null, makeFormData({ title: "No onion" }));

      expect(result).toEqual({
        message: "SubModifier No onion successfully created",
        type: "success",
      });
    });
  });
});

describe("updateSubmodifier", () => {
  const fd = (overrides: Record<string, string> = {}): FormData =>
    makeFormData({ id: "1", ...overrides });

  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateSubmodifier(null, fd());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it("returns error when title is empty", async () => {
      const result = await updateSubmodifier(null, fd({ title: "" }));

      expect(result).toEqual({ message: "Title is required", type: "error" });
    });

    it("returns error when submodifier is not found", async () => {
      jest.mocked(store.submodifiers.getById).mockResolvedValue(null);

      const result = await updateSubmodifier(null, fd({ id: "99" }));

      expect(result.type).toBe("error");
      expect(result.message).toContain("99");
    });
  });

  describe("success", () => {
    it("saves the updated submodifier with correct fields", async () => {
      await updateSubmodifier(null, fd({ sortOrder: "3", title: "No garlic" }));

      expect(store.submodifiers.set).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, sortOrder: 3, title: "No garlic" }),
      );
    });

    it("revalidates the admin submodifiers page", async () => {
      await updateSubmodifier(null, fd());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/submodifiers");
    });

    it("returns success with title in the message", async () => {
      const result = await updateSubmodifier(null, fd({ title: "Mild" }));

      expect(result).toEqual({
        message: "SubModifier Mild successfully updated",
        type: "success",
      });
    });
  });
});

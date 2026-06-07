import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { updateAdditionalInfo } from "../updateAdditionalInfo";

jest.mock("@/store", () => ({
  store: {
    additionalInfo: { set: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    col1Text: "12.5 km od středu",
    col1Title: "Doprava",
    col2Text: "Hotovost / Karta",
    col2Title: "Placení",
    col3Text: "Přes web, rychle",
    col3Title: "Objednání",
    description: "Rozvoz Pn. - Čt. 11:00-22:00",
    title: "Doplňkové informace",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.additionalInfo.set).mockResolvedValue(undefined);
});

describe("updateAdditionalInfo", () => {
  describe("auth", () => {
    it("returns error and does not save when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null);

      const result = await updateAdditionalInfo(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.additionalInfo.set).not.toHaveBeenCalled();
    });

    it("returns error and does not save when role is not admin", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue({ role: "user" } as never);

      const result = await updateAdditionalInfo(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.additionalInfo.set).not.toHaveBeenCalled();
    });
  });

  describe("success", () => {
    it("saves all eight fields to the store", async () => {
      await updateAdditionalInfo(null, makeFormData());

      expect(store.additionalInfo.set).toHaveBeenCalledTimes(1);
      expect(store.additionalInfo.set).toHaveBeenCalledWith({
        col1Text: "12.5 km od středu",
        col1Title: "Doprava",
        col2Text: "Hotovost / Karta",
        col2Title: "Placení",
        col3Text: "Přes web, rychle",
        col3Title: "Objednání",
        description: "Rozvoz Pn. - Čt. 11:00-22:00",
        title: "Doplňkové informace",
      });
    });

    it("trims leading and trailing whitespace from every field", async () => {
      await updateAdditionalInfo(
        null,
        makeFormData({ col1Text: "  text  ", col1Title: " Title ", title: "  Info  " }),
      );

      const [patch] = jest.mocked(store.additionalInfo.set).mock.calls[0] as [
        Partial<TAdditionalInfo>
      ];

      expect(patch.title).toBe("Info");
      expect(patch.col1Title).toBe("Title");
      expect(patch.col1Text).toBe("text");
    });

    it("saves empty string when a field is blank (no required-field guard)", async () => {
      await updateAdditionalInfo(null, makeFormData({ col2Title: "   " }));

      const [patch] = jest.mocked(store.additionalInfo.set).mock.calls[0] as [
        Partial<TAdditionalInfo>
      ];

      expect(patch.col2Title).toBe("");
    });

    it("revalidates the admin additionalInfo page", async () => {
      await updateAdditionalInfo(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/additionalInfo");
    });

    it("revalidates the home layout so the public page reflects changes", async () => {
      await updateAdditionalInfo(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
    });

    it("returns a success result", async () => {
      const result = await updateAdditionalInfo(null, makeFormData());

      expect(result).toEqual({ message: "Additional info updated", type: "success" });
    });
  });
});

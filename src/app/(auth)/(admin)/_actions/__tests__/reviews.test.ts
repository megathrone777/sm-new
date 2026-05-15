import { beforeEach, describe, expect, it } from "@jest/globals";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { createReview } from "../createReview";
import { updateReview } from "../updateReview";

jest.mock("@/store", () => ({
  store: {
    reviews: { create: jest.fn(), getAll: jest.fn() },
    sessions: { get: jest.fn() },
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const makeReview = (overrides: Partial<TReview> = {}): TReview => ({
  count: "420+",
  id: 1,
  imageUrl: "",
  link: "https://www.instagram.com/sushiman",
  linkTitle: "Více",
  ratingImageUrl: "",
  text: "pozitivních recenzí",
  ...overrides,
});

const makeFormData = (overrides: Record<string, string> = {}): FormData => {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    count: "420+",
    link: "https://www.instagram.com/sushiman",
    linkTitle: "Více",
    text: "pozitivních recenzí",
  };

  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    fd.set(k, v);
  }

  return fd;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(store.sessions.get).mockResolvedValue({ role: "admin" } as never);
  jest.mocked(store.reviews.create).mockResolvedValue(undefined as never);
  jest.mocked(store.reviews.getAll).mockResolvedValue([makeReview()] as never);
});

describe("createReview", () => {
  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await createReview(null, makeFormData());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
      expect(store.reviews.create).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it.each([["count"], ["text"], ["link"], ["linkTitle"]])(
      "returns error when %s is empty",
      async (field) => {
        const result = await createReview(null, makeFormData({ [field]: "" }));

        expect(result).toEqual({ message: "All fields are required", type: "error" });
        expect(store.reviews.create).not.toHaveBeenCalled();
      },
    );
  });

  describe("success", () => {
    it("assigns id = max existing id + 1", async () => {
      jest.mocked(store.reviews.getAll).mockResolvedValue([makeReview({ id: 5 })] as never);

      await createReview(null, makeFormData());

      const [review] = jest.mocked(store.reviews.create).mock.calls[0] as [TReview];

      expect(review.id).toBe(6);
    });

    it("assigns id = 1 when there are no existing reviews", async () => {
      jest.mocked(store.reviews.getAll).mockResolvedValue([] as never);

      await createReview(null, makeFormData());

      const [review] = jest.mocked(store.reviews.create).mock.calls[0] as [TReview];

      expect(review.id).toBe(1);
    });

    it("creates the review with empty image URLs", async () => {
      await createReview(null, makeFormData());

      expect(store.reviews.create).toHaveBeenCalledWith(
        expect.objectContaining({ imageUrl: "", ratingImageUrl: "" }),
      );
    });

    it("saves all text fields trimmed", async () => {
      await createReview(null, makeFormData({ count: " 420+ ", text: " pozitivních " }));

      expect(store.reviews.create).toHaveBeenCalledWith(
        expect.objectContaining({ count: "420+", text: "pozitivních" }),
      );
    });

    it("revalidates the admin reviews page", async () => {
      await createReview(null, makeFormData());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/reviews");
    });

    it("returns success", async () => {
      const result = await createReview(null, makeFormData());

      expect(result).toEqual({ message: "Review successfully created", type: "success" });
    });
  });
});

describe("updateReview", () => {
  const fd = (overrides: Record<string, string> = {}): FormData =>
    makeFormData({ id: "1", ...overrides });

  describe("auth", () => {
    it("returns error when session is missing", async () => {
      jest.mocked(store.sessions.get).mockResolvedValue(null as never);

      const result = await updateReview(null, fd());

      expect(result).toEqual({ message: "Unauthorized", type: "error" });
    });
  });

  describe("validation", () => {
    it.each([["count"], ["text"], ["link"], ["linkTitle"]])(
      "returns error when %s is empty",
      async (field) => {
        const result = await updateReview(null, fd({ [field]: "" }));

        expect(result).toEqual({ message: "All fields are required", type: "error" });
      },
    );

    it("throws when the review id is not found", async () => {
      jest.mocked(store.reviews.getAll).mockResolvedValue([] as never);

      await expect(updateReview(null, fd())).rejects.toThrow("Review 1 not found");
    });
  });

  describe("success", () => {
    it("merges updated text fields with the existing review", async () => {
      await updateReview(null, fd({ count: "500+", text: "nových recenzí" }));

      expect(store.reviews.create).toHaveBeenCalledWith(
        expect.objectContaining({
          count: "500+",
          id: 1,
          imageUrl: "",
          text: "nových recenzí",
        }),
      );
    });

    it("revalidates the admin reviews page", async () => {
      await updateReview(null, fd());

      expect(revalidatePath).toHaveBeenCalledWith("/admin/reviews");
    });

    it("returns success", async () => {
      const result = await updateReview(null, fd());

      expect(result).toEqual({ message: "Review successfully updated", type: "success" });
    });
  });
});

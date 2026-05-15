"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const createReview = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const count = `${formData.get("count") ?? ""}`.trim();
  const link = `${formData.get("link") ?? ""}`.trim();
  const linkTitle = `${formData.get("linkTitle") ?? ""}`.trim();
  const text = `${formData.get("text") ?? ""}`.trim();

  if (!count || !link || !linkTitle || !text) {
    return { message: "All fields are required", type: "error" };
  }

  const existing = await store.reviews.getAll();
  const id = existing.length ? Math.max(...existing.map<number>(({ id }) => id)) + 1 : 1;

  await store.reviews.create({
    count,
    id,
    imageUrl: "",
    link,
    linkTitle,
    ratingImageUrl: "",
    text,
  });
  revalidatePath("/admin/reviews");

  return { message: "Review successfully created", type: "success" };
};

export { createReview };
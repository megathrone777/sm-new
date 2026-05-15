"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateReview = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = +formData.get("id")!;
  const count = `${formData.get("count") ?? ""}`.trim();
  const link = `${formData.get("link") ?? ""}`.trim();
  const linkTitle = `${formData.get("linkTitle") ?? ""}`.trim();
  const text = `${formData.get("text") ?? ""}`.trim();

  if (!count || !link || !linkTitle || !text) {
    return { message: "All fields are required", type: "error" };
  }

  const existing = await store.reviews.getAll();
  const review = existing.find((r) => r.id === id);

  if (!review) throw new Error(`Review ${id} not found`);

  await store.reviews.create({ ...review, count, link, linkTitle, text });
  revalidatePath("/admin/reviews");

  return { message: "Review successfully updated", type: "success" };
};

export { updateReview };
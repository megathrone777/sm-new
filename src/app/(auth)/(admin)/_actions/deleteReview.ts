"use server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteReview = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = +formData.get("id")!;
  const title = formData.get("title");

  const existing = await store.reviews.getAll();
  const review = existing.find((review: TReview): boolean => review.id === id);

  await store.reviews.delete(id);

  if (review) {
    const blobUrls = [review.imageUrl, review.ratingImageUrl].filter((url) =>
      url.includes("blob.vercel-storage.com"),
    );

    await Promise.all(blobUrls.map((url) => del(url).catch((): void => {})));
  }

  revalidatePath("/admin/reviews");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteReview };

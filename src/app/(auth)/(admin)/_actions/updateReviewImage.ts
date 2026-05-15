"use server";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateReviewImage = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = +formData.get("id")!;
  const key = `${formData.get("key") ?? ""}`;

  if (key !== "imageUrl" && key !== "ratingImageUrl") {
    return { message: "Invalid image key", type: "error" };
  }

  const imageFile = formData.get("image") as File;

  if (!imageFile?.size) {
    return { message: "Image is required", type: "error" };
  }

  const blob = await put(`reviews/${id}-${key}-${Date.now()}-${imageFile.name}`, imageFile, {
    access: "public",
  });

  const existing = await store.reviews.getAll();
  const review = existing.find((r) => r.id === id);

  if (!review) throw new Error(`Review ${id} not found`);

  const prevUrl = review[key];

  if (prevUrl.includes("blob.vercel-storage.com")) {
    await del(prevUrl).catch((): void => {});
  }

  await store.reviews.create({
    ...review,
    [key]: blob.url,
  });
  revalidatePath("/admin/reviews");

  return { message: "Review image updated", type: "success" };
};

export { updateReviewImage };

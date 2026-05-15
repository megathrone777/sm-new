"use server";
import fs from "fs/promises";
import path from "path";

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

  const ext = path.extname(imageFile.name) || ".jpg";
  const filename = `review-${id}-${key}-${Date.now()}${ext}`;
  const filePath = path.join(process.cwd(), "public", "uploads", "reviews", filename);

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, Buffer.from(await imageFile.arrayBuffer()));

  const existing = await store.reviews.getAll();
  const review = existing.find((r) => r.id === id);

  if (!review) throw new Error(`Review ${id} not found`);

  const prevUrl = review[key];
  const prevFilename = path.basename(prevUrl);

  if (prevFilename.startsWith(`review-${id}-${key}-`)) {
    await fs.unlink(path.join(process.cwd(), "public", prevUrl)).catch((): void => {});
  }

  await store.reviews.create({
    ...review,
    [key]: `/uploads/reviews/${filename}`,
  });
  revalidatePath("/admin/reviews");

  return { message: "Review image updated", type: "success" };
};

export { updateReviewImage };
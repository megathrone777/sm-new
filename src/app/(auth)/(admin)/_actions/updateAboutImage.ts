"use server";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateAboutImage = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const imageFile = formData.get("image") as File;

  if (!imageFile?.size) {
    return { message: "Image is required", type: "error" };
  }

  const blob = await put(`about/${Date.now()}-${imageFile.name}`, imageFile, {
    access: "public",
  });

  const prevUrl = `${formData.get("imageUrl") ?? ""}`;

  if (prevUrl.includes("blob.vercel-storage.com")) {
    await del(prevUrl).catch((): void => {});
  }

  await store.about.set({ imageUrl: blob.url });
  revalidatePath("/admin/about");
  revalidatePath("/", "layout");

  return { message: "About image updated", type: "success" };
};

export { updateAboutImage };

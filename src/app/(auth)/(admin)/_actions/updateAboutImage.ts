"use server";
import fs from "fs/promises";
import path from "path";

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

  const ext = path.extname(imageFile.name) || ".jpg";
  const filename = `about-${Date.now()}${ext}`;
  const filePath = path.join(process.cwd(), "public", "uploads", "about", filename);

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, Buffer.from(await imageFile.arrayBuffer()));

  const prevUrl = `${formData.get("imageUrl") ?? ""}`;
  const prevFilename = path.basename(prevUrl);

  if (prevFilename.startsWith("about-")) {
    await fs.unlink(path.join(process.cwd(), "public", prevUrl)).catch((): void => {});
  }

  await store.about.set({ imageUrl: `/uploads/about/${filename}` });
  revalidatePath("/admin/about");
  revalidatePath("/", "layout");

  return { message: "About image updated", type: "success" };
};

export { updateAboutImage };
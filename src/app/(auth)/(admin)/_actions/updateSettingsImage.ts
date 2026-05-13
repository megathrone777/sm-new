"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { store } from "@/store";
import { VALID_IMAGE_KEYS, type TImageKey } from "@/store/shop";

const updateSettingsImage = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const key = `${formData.get("key") ?? ""}` as TImageKey;

  if (!VALID_IMAGE_KEYS.includes(key)) {
    return { message: "Invalid image key", type: "error" };
  }

  const imageFile = formData.get("image") as File;

  if (!imageFile?.size) {
    return { message: "Image is required", type: "error" };
  }

  const ext = path.extname(imageFile.name) || ".jpg";
  const filename = `${key}-${Date.now()}${ext}`;
  const filePath = path.join(process.cwd(), "public", "uploads", "settings", filename);

  await fs.writeFile(filePath, Buffer.from(await imageFile.arrayBuffer()));

  const prevUrl = `${formData.get("imageUrl") ?? ""}`;
  const prevFilename = path.basename(prevUrl);

  if (prevFilename.startsWith(`${key}-`)) {
    await fs.unlink(path.join(process.cwd(), "public", prevUrl)).catch((): void => {});
  }

  await store.shop.setImageUrl(key, `/uploads/settings/${filename}`);
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");

  return { message: `${key} image updated`, type: "success" };
};

export { updateSettingsImage };

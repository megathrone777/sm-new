"use server";
import { del, put } from "@vercel/blob";
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

  const blob = await put(`settings/${key}-${Date.now()}-${imageFile.name}`, imageFile, {
    access: "public",
  });

  const prevUrl = `${formData.get("imageUrl") ?? ""}`;

  if (prevUrl.includes("blob.vercel-storage.com")) {
    await del(prevUrl).catch((): void => {});
  }

  await store.shop.setImageUrl(key, blob.url);
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");

  return { message: `${key} image updated`, type: "success" };
};

export { updateSettingsImage };

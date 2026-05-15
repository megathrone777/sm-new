"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateAdditionalInfo = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const title = `${formData.get("title") ?? ""}`.trim();
  const description = `${formData.get("description") ?? ""}`.trim();
  const col1Title = `${formData.get("col1Title") ?? ""}`.trim();
  const col1Text = `${formData.get("col1Text") ?? ""}`.trim();
  const col2Title = `${formData.get("col2Title") ?? ""}`.trim();
  const col2Text = `${formData.get("col2Text") ?? ""}`.trim();
  const col3Title = `${formData.get("col3Title") ?? ""}`.trim();
  const col3Text = `${formData.get("col3Text") ?? ""}`.trim();

  await store.additionalInfo.set({
    col1Text,
    col1Title,
    col2Text,
    col2Title,
    col3Text,
    col3Title,
    description,
    title,
  });

  revalidatePath("/admin/additionalInfo");
  revalidatePath("/", "layout");

  return { message: "Additional info updated", type: "success" };
};

export { updateAdditionalInfo };

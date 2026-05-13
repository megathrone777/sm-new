"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";
import { SMS_TEMPLATE_KEYS } from "@/store/smsTemplates";

const updateSmsTemplate = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const key = `${formData.get("key") ?? ""}` as TSmsTemplateKey;

  if (!SMS_TEMPLATE_KEYS.includes(key)) {
    return { message: "Invalid template key", type: "error" };
  }

  const text = `${formData.get("text") ?? ""}`.trim();

  if (!text) {
    return { message: "Template text is required", type: "error" };
  }

  await store.smsTemplates.set(key, text);
  revalidatePath("/admin/notifications");

  return { message: `${key} updated`, type: "success" };
};

export { updateSmsTemplate };

"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateRules = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const content = `${formData.get("content") ?? ""}`.trim();

  await store.rules.set({ content });
  revalidatePath("/admin/rules");
  revalidatePath("/rules");

  return { message: "Rules updated", type: "success" };
};

export { updateRules };

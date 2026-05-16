"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateTerms = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const content = `${formData.get("content") ?? ""}`.trim();

  await store.terms.set({ content });
  revalidatePath("/admin/terms");
  revalidatePath("/terms");

  return { message: "Terms updated", type: "success" };
};

export { updateTerms };

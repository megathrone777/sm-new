"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateAbout = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const description = `${formData.get("description") ?? ""}`.trim();
  const title = `${formData.get("title") ?? ""}`.trim();

  if (!title) return { message: "Title is required", type: "error" };
  if (!description) return { message: "Description is required", type: "error" };

  await store.about.set({ description, title });
  revalidatePath("/admin/about");
  revalidatePath("/", "layout");

  return { message: "About section updated", type: "success" };
};

export { updateAbout };
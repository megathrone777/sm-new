"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateNavigationTitle = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const href = `${formData.get("href") ?? ""}`.trim();
  const title = `${formData.get("title") ?? ""}`.trim();

  if (!href) {
    return { message: "Href is required", type: "error" };
  }

  if (!title) {
    return { message: "Title is required", type: "error" };
  }

  await store.shop.setNavTitle(href, title);
  revalidatePath("/admin/navigation");
  revalidatePath("/", "layout");

  return { message: `Navigation item "${title}" updated`, type: "success" };
};

export { updateNavigationTitle };

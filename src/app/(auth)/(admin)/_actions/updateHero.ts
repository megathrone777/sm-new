"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateHero = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const title = `${formData.get("title") ?? ""}`.trim();
  const description = `${formData.get("description") ?? ""}`.trim();
  const buttonTitle = `${formData.get("buttonTitle") ?? ""}`.trim();
  const buttonLink =
    `${formData.get("buttonLink") ?? ""}`.trim() as __next_route_internal_types__.RouteImpl<string>;

  if (!title) return { message: "Title is required", type: "error" };
  if (!buttonTitle) return { message: "Button title is required", type: "error" };
  if (!buttonLink) return { message: "Button link is required", type: "error" };

  await store.hero.set({ buttonLink, buttonTitle, description, title });

  revalidatePath("/admin/hero");
  revalidatePath("/", "layout");

  return { message: "Hero updated", type: "success" };
};

export { updateHero };

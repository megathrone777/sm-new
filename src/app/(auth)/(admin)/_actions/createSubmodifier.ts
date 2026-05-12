"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const createSubmodifier = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const title = `${formData.get("title") ?? ""}`.trim();
  const sortOrder = +(formData.get("sortOrder") ?? 0);

  if (!title) {
    return {
      message: "Title is required",
      type: "error",
    };
  }

  const existing = await store.submodifiers.getAll();
  const id = existing.length ? Math.max(...existing.map(({ id }) => id)) + 1 : 1;

  await store.submodifiers.set({ id, sortOrder, title });
  revalidatePath("/admin/submodifiers");

  return {
    message: `SubModifier ${title} successfully created`,
    type: "success",
  };
};

export { createSubmodifier };

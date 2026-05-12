"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateSubmodifier = async (
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

  const id = +formData.get("id")!;
  const sortOrder = +(formData.get("sortOrder") ?? 0);
  const title = `${formData.get("title") ?? ""}`.trim();

  if (!title) {
    return {
      message: "Title is required",
      type: "error",
    };
  }

  const prev = await store.submodifiers.getById(id);

  if (!prev) {
    return {
      message: `Submodifier ${id} not found`,
      type: "error",
    };
  }

  await store.submodifiers.set({ id, sortOrder, title });
  revalidatePath("/admin/submodifiers");

  return {
    message: `SubModifier ${title} successfully updated`,
    type: "success",
  };
};

export { updateSubmodifier };

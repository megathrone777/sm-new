"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const createAdditional = async (
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

  if (!title) {
    return {
      message: "Title is required",
      type: "error",
    };
  }

  const price = +(formData.get("price") ?? 0);
  const sortOrder = +(formData.get("sortOrder") ?? 0);
  const existing = await store.additionals.getAll();
  const id = existing.length ? Math.max(...existing.map<number>(({ id }) => id)) + 1 : 1;

  await store.additionals.create({ id, price, sortOrder, title });
  revalidatePath("/admin/additionals");

  return {
    message: `${title} successfully created`,
    type: "success",
  };
};

export { createAdditional };

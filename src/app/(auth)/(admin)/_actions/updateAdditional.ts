"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateAdditional = async (
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
  const title = `${formData.get("title") ?? ""}`.trim();
  const price = +(formData.get("price") ?? 0);
  const sortOrder = +(formData.get("sortOrder") ?? 0);
  const prev = await store.additionals.getById(id);

  if (!prev) throw new Error(`Additional ${id} not found`);

  await store.additionals.create({ ...prev, price, sortOrder, title });
  revalidatePath("/admin/additionals");

  return {
    message: `Additional ${title} successfully updated`,
    type: "success",
  };
};

export { updateAdditional };

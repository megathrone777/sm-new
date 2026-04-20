"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { additionalsStore } from "@/store";

const updateAdditional = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const id = Number(formData.get("id"));
  const title = (formData.get("title") as string).trim();
  const price = Number(formData.get("price") ?? 0);
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const prev = await additionalsStore.getById(id);

  if (!prev) throw new Error(`Additional ${id} not found`);

  await additionalsStore.set({ ...prev, price, sortOrder, title });

  revalidatePath("/admin/additionals");

  return {
    message: `Additional ${title} successfully updated`,
    type: "success",
  };
};

export { updateAdditional };

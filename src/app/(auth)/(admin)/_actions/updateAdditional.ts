"use server";
import { revalidatePath } from "next/cache";

import { additionalsHelpers } from "@/helpers/additionals";
import { authHelpers } from "@/helpers/auth";
import { redis } from "@/lib";

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
  const prev = await additionalsHelpers.getAdditionalById(id);

  if (!prev) throw new Error(`Additional ${id} not found`);
  const additional: TAdditional = { ...prev, price, sortOrder, title };

  await redis.hset("additionals", { [id]: JSON.stringify(additional) });

  revalidatePath("/admin/additionals");

  return {
    message: `Additional ${title} successfully updated`,
    type: "success",
  };
};

export { updateAdditional };

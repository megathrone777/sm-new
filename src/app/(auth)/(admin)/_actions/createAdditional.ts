"use server";
import { revalidatePath } from "next/cache";

import { additionalsHelpers } from "@/helpers/additionals";
import { authHelpers } from "@/helpers/auth";
import { redis } from "@/lib";

const createAdditional = async (
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

  const title = (formData.get("title") as string).trim();

  if (!title) {
    return {
      message: "Title is required",
      type: "error",
    };
  }

  const price = Number(formData.get("price") ?? 0);
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const existing = await additionalsHelpers.getAdditionals();
  const id = existing.length ? Math.max(...existing.map<number>(({ id }) => id)) + 1 : 1;
  const additional: TAdditional = { id, price, sortOrder, title };

  await redis.hset("additionals", { [id]: JSON.stringify(additional) });
  revalidatePath("/admin/additionals");

  return {
    message: `${title} successfully created`,
    type: "success",
  };
};

export { createAdditional };

"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";

const MODIFIERS_SEARCH_PREFIX = "modifier:";

const deleteModifier = async (
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

  const id = formData.get("id") as string;
  const title = (formData.get("title") as string).trim();
  const pipeline = redis.pipeline();

  pipeline.hdel("modifiers", id);
  pipeline.del(`${MODIFIERS_SEARCH_PREFIX}${id}`);
  await pipeline.exec();
  revalidatePath("/admin/modifiers");

  return {
    message: `Modifier "${title}" successfully deleted`,
    type: "success",
  };
};

export { deleteModifier };

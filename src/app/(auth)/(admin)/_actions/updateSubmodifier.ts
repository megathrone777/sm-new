"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { submodifiersHelpers } from "@/helpers/submodifiers";
import { redis } from "@/lib";

const updateSubmodifier = async (
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
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const title = (formData.get("title") as string).trim();

  if (!title) {
    return {
      message: "Title is required",
      type: "error",
    };
  }

  const prev = await submodifiersHelpers.getSubmodifierById(id);

  if (!prev) {
    return {
      message: `Submodifier ${id} not found`,
      type: "error",
    };
  }

  await redis.hset("submodifiers", { [id]: JSON.stringify({ id, sortOrder, title }) });
  revalidatePath("/admin/submodifiers");

  return {
    message: `SubModifier ${title} successfully updated`,
    type: "success",
  };
};

export { updateSubmodifier };

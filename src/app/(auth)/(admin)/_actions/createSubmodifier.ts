"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { submodifiersHelpers } from "@/helpers/submodifiers";
import { redis } from "@/lib";

const createSubmodifier = async (
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
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  if (!title) {
    return {
      message: "Title is required",
      type: "error",
    };
  }

  const existing = await submodifiersHelpers.getSubmodifiers();
  const id = existing.length ? Math.max(...existing.map(({ id }) => id)) + 1 : 1;

  await redis.hset("submodifiers", { [id]: JSON.stringify({ id, sortOrder, title }) });
  revalidatePath("/admin/submodifiers");

  return {
    message: `SubModifier ${title} successfully created`,
    type: "success",
  };
};

export { createSubmodifier };

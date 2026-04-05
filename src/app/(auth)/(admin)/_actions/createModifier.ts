"use server";
import { revalidatePath } from "next/cache";

import { authHelpers, modifiersHelpers, submodifiersHelpers } from "@/helpers";
import { redis } from "@/lib";

const MODIFIERS_SEARCH_PREFIX = "modifier:";

const createModifier = async (
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
  const requiredSubModifier = formData.get("requiredSubModifier") === "on";
  const subModifierIds = formData.getAll("subModifierIds").map(Number);
  const [existing, allSubs] = await Promise.all([
    modifiersHelpers.getModifiers(),
    submodifiersHelpers.getSubmodifiers(),
  ]);
  const id = existing.length ? Math.max(...existing.map<number>(({ id }) => id)) + 1 : 1;
  const subModifiers = allSubs.filter(({ id: sid }) => subModifierIds.includes(sid));
  const modifier: TModifier = { id, price, requiredSubModifier, sortOrder, subModifiers, title };

  const pipeline = redis.pipeline();

  pipeline.hset("modifiers", { [id]: JSON.stringify(modifier) });
  pipeline.hset(`${MODIFIERS_SEARCH_PREFIX}${id}`, { id, price, title });

  await pipeline.exec();
  revalidatePath("/admin/modifiers");

  return {
    message: `Modifier ${title} successfully created`,
    type: "success",
  };
};

export { createModifier };

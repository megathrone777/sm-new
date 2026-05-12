"use server";
import { revalidatePath } from "next/cache";

import { redis, store } from "@/store";

const createModifier = async (
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

  const price = +formData.get("price")!;
  const sortOrder = +formData.get("sortOrder")!;
  const requiredSubModifier = formData.get("requiredSubModifier") === "on";
  const subModifierIds = formData.getAll("subModifierIds").map(Number);
  const [existingMap, subsMap] = await redis
    .pipeline()
    .hgetall<Record<string, TModifier>>("modifiers")
    .hgetall<Record<string, TSubmodifier>>("submodifiers")
    .exec<[null | Record<string, TModifier>, null | Record<string, TSubmodifier>]>();

  const existing = existingMap ? Object.values(existingMap) : [];
  const allSubs = subsMap ? Object.values(subsMap) : [];
  const id = existing.length ? Math.max(...existing.map<number>(({ id }) => id)) + 1 : 1;
  const subModifiers = allSubs.filter(({ id: sid }): boolean => subModifierIds.includes(sid));

  await store.modifiers.set({ id, price, requiredSubModifier, sortOrder, subModifiers, title });
  revalidatePath("/admin/modifiers");

  return {
    message: `Modifier ${title} successfully created`,
    type: "success",
  };
};

export { createModifier };

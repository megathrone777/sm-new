"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { modifiersStore, redis } from "@/store";

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
  const [existingMap, subsMap] = await redis
    .pipeline()
    .hgetall<Record<string, TModifier>>("modifiers")
    .hgetall<Record<string, TSubmodifier>>("submodifiers")
    .exec<[null | Record<string, TModifier>, null | Record<string, TSubmodifier>]>();

  const existing = existingMap ? Object.values(existingMap) : [];
  const allSubs = subsMap ? Object.values(subsMap) : [];
  const id = existing.length ? Math.max(...existing.map<number>(({ id }) => id)) + 1 : 1;
  const subModifiers = allSubs.filter(({ id: sid }) => subModifierIds.includes(sid));

  await modifiersStore.set({ id, price, requiredSubModifier, sortOrder, subModifiers, title });
  revalidatePath("/admin/modifiers");

  return {
    message: `Modifier ${title} successfully created`,
    type: "success",
  };
};

export { createModifier };

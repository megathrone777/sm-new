"use server";
import { revalidatePath } from "next/cache";

import { redis, store } from "@/store";

const updateModifier = async (
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

  const id = formData.get("id");
  const title = `${formData.get("title")}`.trim();
  const price = +(formData.get("price") ?? 0);
  const sortOrder = +(formData.get("sortOrder") ?? 0);
  const requiredSubModifier = formData.get("requiredSubModifier") === "on";
  const subModifierIds = formData.getAll("subModifierIds").map(Number);

  const [prev, subsMap] = await redis
    .pipeline()
    .hget<TModifier>("modifiers", `${id}`)
    .hgetall<Record<string, TSubmodifier>>("submodifiers")
    .exec<[null | TModifier, null | Record<string, TSubmodifier>]>();

  if (!prev) {
    return {
      message: `Modifier ${id} not found`,
      type: "error",
    };
  }

  const allSubs = subsMap ? Object.values(subsMap) : [];
  const subModifiers = allSubs.filter(({ id: sid }) => subModifierIds.includes(sid));

  await store.modifiers.set({
    ...prev,
    price,
    requiredSubModifier,
    sortOrder,
    subModifiers,
    title,
  });

  revalidatePath("/admin/modifiers");
  revalidatePath(`/admin/modifier/${id}`);

  return {
    message: `Modifier #${id} successfully updated`,
    type: "success",
  };
};

export { updateModifier };

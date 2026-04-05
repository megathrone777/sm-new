"use server";
import { revalidatePath } from "next/cache";

import { authHelpers, modifiersHelpers, submodifiersHelpers } from "@/helpers";
import { redis } from "@/lib";

const createModifier = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const title = (formData.get("title") as string).trim();

  if (!title) throw new Error("Title is required");

  const price = Number(formData.get("price") ?? 0);
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const requiredSubModifier = formData.get("requiredSubModifier") === "on";
  const subModifierIds = formData.getAll("subModifierIds").map(Number);

  const [existing, allSubs] = await Promise.all([
    modifiersHelpers.getModifiers(),
    submodifiersHelpers.getSubmodifiers(),
  ]);

  const id = existing.length ? Math.max(...existing.map(({ id }) => id)) + 1 : 1;
  const subModifiers = allSubs.filter(({ id: sid }) => subModifierIds.includes(sid));

  const modifier: TModifier = { id, price, requiredSubModifier, sortOrder, subModifiers, title };

  await redis.hset("modifiers", { [id]: JSON.stringify(modifier) });

  revalidatePath("/admin/modifiers");
};

export { createModifier };

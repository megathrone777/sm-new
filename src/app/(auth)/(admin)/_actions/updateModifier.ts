"use server";
import { revalidatePath } from "next/cache";

import { authHelpers, modifiersHelpers, submodifiersHelpers } from "@/helpers";
import { redis } from "@/lib";

const updateModifier = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = Number(formData.get("id"));
  const title = (formData.get("title") as string).trim();
  const price = Number(formData.get("price") ?? 0);
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const requiredSubModifier = formData.get("requiredSubModifier") === "on";
  const subModifierIds = formData.getAll("subModifierIds").map(Number);

  const [prev, allSubs] = await Promise.all([
    modifiersHelpers.getModifierById(id),
    submodifiersHelpers.getSubmodifiers(),
  ]);

  if (!prev) throw new Error(`Modifier ${id} not found`);

  const subModifiers = allSubs.filter(({ id: sid }) => subModifierIds.includes(sid));
  const modifier: TModifier = { ...prev, price, requiredSubModifier, sortOrder, subModifiers, title };

  await redis.hset("modifiers", { [id]: JSON.stringify(modifier) });

  revalidatePath("/admin/modifiers");
  revalidatePath(`/admin/modifier/${id}`);
};

export { updateModifier };

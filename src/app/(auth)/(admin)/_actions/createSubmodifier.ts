"use server";
import { revalidatePath } from "next/cache";

import { authHelpers, submodifiersHelpers } from "@/helpers";
import { redis } from "@/lib";

const createSubmodifier = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const title = (formData.get("title") as string).trim();

  if (!title) throw new Error("Title is required");

  const existing = await submodifiersHelpers.getSubmodifiers();
  const id = existing.length ? Math.max(...existing.map(({ id }) => id)) + 1 : 1;

  await redis.hset("submodifiers", { [id]: JSON.stringify({ id, title }) });

  revalidatePath("/admin/submodifiers");
};

export { createSubmodifier };

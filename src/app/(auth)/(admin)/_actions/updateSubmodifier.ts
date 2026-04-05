"use server";
import { revalidatePath } from "next/cache";

import { authHelpers, submodifiersHelpers } from "@/helpers";
import { redis } from "@/lib";

const updateSubmodifier = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = Number(formData.get("id"));
  const title = (formData.get("title") as string).trim();

  if (!title) throw new Error("Title is required");

  const prev = await submodifiersHelpers.getSubmodifierById(id);

  if (!prev) throw new Error(`Submodifier ${id} not found`);

  await redis.hset("submodifiers", { [id]: JSON.stringify({ id, title }) });

  revalidatePath("/admin/submodifiers");
};

export { updateSubmodifier };

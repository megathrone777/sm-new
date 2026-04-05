"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";

const deleteSubmodifier = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = formData.get("id") as string;

  await redis.hdel("submodifiers", id);

  revalidatePath("/admin/submodifiers");
  revalidatePath("/admin/modifiers");
};

export { deleteSubmodifier };

"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";

const deleteModifier = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = formData.get("id") as string;

  await redis.hdel("modifiers", id);

  revalidatePath("/admin/modifiers");
};

export { deleteModifier };

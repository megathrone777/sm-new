"use server";
import { revalidatePath } from "next/cache";

import { additionalsHelpers, authHelpers } from "@/helpers";
import { redis } from "@/lib";

const createAdditional = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const title = (formData.get("title") as string).trim();

  if (!title) throw new Error("Title is required");

  const price = Number(formData.get("price") ?? 0);
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  const existing = await additionalsHelpers.getAdditionals();
  const id = existing.length ? Math.max(...existing.map(({ id }) => id)) + 1 : 1;

  const additional: TAdditional = { id, price, sortOrder, title };

  await redis.hset("additionals", { [id]: JSON.stringify(additional) });

  revalidatePath("/admin/additionals");
};

export { createAdditional };

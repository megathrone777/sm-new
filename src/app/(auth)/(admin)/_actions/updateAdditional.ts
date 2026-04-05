"use server";
import { revalidatePath } from "next/cache";

import { additionalsHelpers, authHelpers } from "@/helpers";
import { redis } from "@/lib";

const updateAdditional = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = Number(formData.get("id"));
  const title = (formData.get("title") as string).trim();
  const price = Number(formData.get("price") ?? 0);
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  const prev = await additionalsHelpers.getAdditionalById(id);

  if (!prev) throw new Error(`Additional ${id} not found`);

  const additional: TAdditional = { ...prev, price, sortOrder, title };

  await redis.hset("additionals", { [id]: JSON.stringify(additional) });

  revalidatePath("/admin/additionals");
};

export { updateAdditional };

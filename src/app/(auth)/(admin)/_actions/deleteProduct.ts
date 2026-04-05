"use server";
import { redirect } from "next/navigation";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";

const deleteProduct = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const id = formData.get("id") as string;

  const title = formData.get("title") as string;

  await redis.hdel("products", id);

  redirect(`/admin/products?deleted=${encodeURIComponent(title)}`, "replace");
};

export { deleteProduct };

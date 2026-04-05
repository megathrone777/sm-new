"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";

const deleteUser = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const login = formData.get("login") as string;
  const user = await authHelpers.getUser(login);

  if (!user) throw new Error(`User "${login}" not found`);
  if (user.role === "admin") throw new Error("Cannot delete admin users");

  await redis.hdel("users", login);

  revalidatePath("/admin/users");
};

export { deleteUser };

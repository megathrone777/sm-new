"use server";
import crypto from "crypto";

import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";
import { hashPassword } from "@/utils";

const createUser = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");
  const login = (formData.get("login") as string).trim();
  const role = formData.get("role") as TUserRole;
  const password = (formData.get("password") as string).trim();

  if (!login) throw new Error("Login is required");
  if (!role) throw new Error("Role is required");
  if (!password) throw new Error("Password is required");
  const existing = await authHelpers.getUser(login);

  if (existing) throw new Error(`User "${login}" already exists`);

  const { hash, salt } = hashPassword(password);

  const user: TUser = {
    id: crypto.randomUUID(),
    login,
    passwordHash: hash,
    role,
    salt,
  };

  await redis.hset("users", { [login]: JSON.stringify(user) });

  revalidatePath("/admin/users");
};

export { createUser };

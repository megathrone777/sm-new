"use server";
import crypto from "crypto";

import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { redis } from "@/lib";
import { hashPassword } from "@/utils";

const createUser = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const login = (formData.get("login") as string).trim();
  const role = formData.get("role") as TUserRole;
  const password = (formData.get("password") as string).trim();

  if (!login) {
    return {
      message: "Login is required",
      type: "error",
    };
  }

  if (!role) {
    return {
      message: "Role is required",
      type: "error",
    };
  }

  if (!password) {
    return {
      message: "Password is required",
      type: "error",
    };
  }

  const existing = await authHelpers.getUser(login);

  if (existing) {
    return {
      message: `User "${login}" already exists`,
      type: "error",
    };
  }

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

  return {
    message: `User "${login}" successfully created`,
    type: "success",
  };
};

export { createUser };

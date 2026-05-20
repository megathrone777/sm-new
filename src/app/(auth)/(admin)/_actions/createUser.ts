"use server";
import { randomUUID } from "crypto";

import { revalidatePath } from "next/cache";

import { store } from "@/store";
import { hashPassword } from "@/utils";

const createUser = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const login = `${formData.get("login") ?? ""}`.trim();
  const role = formData.get("role") as TUserRole;
  const password = `${formData.get("password") ?? ""}`.trim();

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

  const existing = await store.users.get(login);

  if (existing) {
    return {
      message: `User "${login}" already exists`,
      type: "error",
    };
  }

  const { hash, salt } = hashPassword(password);

  await store.users.set({
    id: randomUUID(),
    login,
    passwordHash: hash,
    role,
    salt,
  });
  revalidatePath("/admin/users");

  return {
    message: `User "${login}" successfully created`,
    type: "success",
  };
};

export { createUser };

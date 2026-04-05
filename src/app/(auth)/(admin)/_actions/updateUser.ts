"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";
import { hashPassword } from "@/utils";

const updateUser = async (
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

  const currentLogin = (formData.get("currentLogin") as string).trim();
  const newLogin = (formData.get("login") as string).trim();
  const password = (formData.get("password") as string).trim();
  const role = formData.get("role") as TUserRole;
  const prevUser = await authHelpers.getUser(currentLogin);

  if (!prevUser) {
    return {
      message: `User "${currentLogin}" not found`,
      type: "error",
    };
  }

  const passwordFields = password
    ? (({ hash, salt }): { passwordHash: string; salt: string } => ({ passwordHash: hash, salt }))(
        hashPassword(password),
      )
    : { passwordHash: prevUser.passwordHash, salt: prevUser.salt };
  const updated: TUser = { ...prevUser, ...passwordFields, login: newLogin, role };

  if (newLogin !== currentLogin) {
    await Promise.all([
      redis.hdel("users", currentLogin),
      redis.hset("users", { [newLogin]: JSON.stringify(updated) }),
    ]);
  } else {
    await redis.hset("users", { [newLogin]: JSON.stringify(updated) });
  }

  revalidatePath("/admin/users");

  return {
    message: `User "${newLogin}" successfully updated`,
    type: "success",
  };
};

export { updateUser };

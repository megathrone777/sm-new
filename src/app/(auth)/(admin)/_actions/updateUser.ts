"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";
import { hashPassword } from "@/utils";

const updateUser = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const currentLogin = (formData.get("currentLogin") as string).trim();
  const newLogin = (formData.get("login") as string).trim();
  const password = (formData.get("password") as string).trim();
  const role = formData.get("role") as TUserRole;

  const prev = await authHelpers.getUser(currentLogin);

  if (!prev) throw new Error(`User "${currentLogin}" not found`);

  const passwordFields = password
    ? (({ hash, salt }): { passwordHash: string; salt: string } => ({ passwordHash: hash, salt }))(
        hashPassword(password),
      )
    : { passwordHash: prev.passwordHash, salt: prev.salt };

  const updated: TUser = { ...prev, ...passwordFields, login: newLogin, role };

  if (newLogin !== currentLogin) {
    await Promise.all([
      redis.hdel("users", currentLogin),
      redis.hset("users", { [newLogin]: JSON.stringify(updated) }),
    ]);
  } else {
    await redis.hset("users", { [newLogin]: JSON.stringify(updated) });
  }

  revalidatePath("/admin/users");
};

export { updateUser };

"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";
import { hashPassword } from "@/utils";

const updateUser = async (
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

  const currentLogin = `${formData.get("currentLogin") ?? ""}`.trim();
  const newLogin = `${formData.get("login") ?? ""}`.trim();
  const password = `${formData.get("password") ?? ""}`.trim();
  const role = formData.get("role") as TUserRole;
  const prevUser = await store.users.get(currentLogin);

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
    await store.users.rename(currentLogin, updated);
  } else {
    await store.users.set(updated);
  }

  revalidatePath("/admin/users");

  return {
    message: `User "${newLogin}" successfully updated`,
    type: "success",
  };
};

export { updateUser };

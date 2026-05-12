"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteUser = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") throw new Error("Unauthorized");

  const login = formData.get("id") as string;
  const title = formData.get("title");
  const user = await store.users.get(login);

  if (!user) throw new Error(`User "${login}" not found`);
  if (user.role === "admin") throw new Error("Cannot delete admin users");

  await store.users.delete(login);

  revalidatePath("/admin/users");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteUser };

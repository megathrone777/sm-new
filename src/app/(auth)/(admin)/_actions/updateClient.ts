"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateClient = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const phoneNumber = `${formData.get("phoneNumber") ?? ""}`.trim();
  const name = `${formData.get("name") ?? ""}`.trim();
  const email = `${formData.get("email") ?? ""}`.trim();

  if (!phoneNumber || !name) {
    return { message: "Phone number and name are required", type: "error" };
  }

  await store.clients.update({ email, name, phoneNumber });
  revalidatePath("/admin/clients");

  return { message: `Client ${name} successfully updated`, type: "success" };
};

export { updateClient };

"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const createClient = async (
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

  if (await store.clients.exists(phoneNumber)) {
    return { message: `Client with phone ${phoneNumber} already exists`, type: "error" };
  }

  await store.clients.set({ email, name, phoneNumber });
  revalidatePath("/admin/clients");

  return { message: `Client ${name} successfully created`, type: "success" };
};

export { createClient };

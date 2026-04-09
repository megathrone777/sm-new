"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";

const updateClient = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const phoneNumber = (formData.get("phoneNumber") as string).trim();
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();

  if (!phoneNumber || !name) {
    return { message: "Phone number and name are required", type: "error" };
  }

  await redis.hset(`client:${phoneNumber}`, { email, name, phoneNumber });
  revalidatePath("/admin/clients");

  return { message: `Client ${name} successfully updated`, type: "success" };
};

export { updateClient };

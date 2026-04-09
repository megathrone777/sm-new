"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers";
import { redis } from "@/lib";

const deleteClient = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const phoneNumber = (formData.get("phoneNumber") as string).trim();

  if (!phoneNumber) {
    return { message: "Phone number is required", type: "error" };
  }

  const pipeline = redis.pipeline();

  pipeline.del(`client:${phoneNumber}`);
  pipeline.zrem("clients", phoneNumber);
  await pipeline.exec();

  revalidatePath("/admin/clients");

  return { message: `Client ${phoneNumber} successfully deleted`, type: "success" };
};

export { deleteClient };

"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { redis } from "@/lib";

const createClient = async (
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

  const exists = await redis.exists(`client:${phoneNumber}`);

  if (exists) {
    return { message: `Client with phone ${phoneNumber} already exists`, type: "error" };
  }

  const pipeline = redis.pipeline();
  const now = Date.now();

  pipeline.hset(`client:${phoneNumber}`, { email, name, phoneNumber });
  pipeline.zadd("clients", { member: phoneNumber, score: now });
  await pipeline.exec();
  revalidatePath("/admin/clients");

  return { message: `Client ${name} successfully created`, type: "success" };
};

export { createClient };

"use server";
import { redirect } from "next/navigation";

import { authHelpers } from "@/helpers/auth";
import { redis } from "@/lib";

import type { FlatIndexSchema } from "@upstash/redis";

const CLIENT_SEARCH_INDEX = "idx:clients";

const CLIENT_SEARCH_SCHEMA = {
  email: "TEXT",
  name: "TEXT",
  phoneNumber: "TEXT",
} as const satisfies FlatIndexSchema;

const deleteClient = async (formData: FormData): Promise<void> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    console.error("Unauthorized");
  }

  const phoneNumber = (formData.get("phoneNumber") as string).trim();

  if (!phoneNumber) {
    console.error("Phone number is required");
  }

  const pipeline = redis.pipeline();

  pipeline.del(`client:${phoneNumber}`);
  pipeline.zrem("clients", phoneNumber);
  await pipeline.exec();

  const index = redis.search.index({
    name: CLIENT_SEARCH_INDEX,
    schema: CLIENT_SEARCH_SCHEMA,
  });

  await index.waitIndexing();
  redirect("/admin/clients");
};

export { deleteClient };

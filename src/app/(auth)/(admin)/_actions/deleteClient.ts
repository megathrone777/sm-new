"use server";
import { redirect } from "next/navigation";

import { redis, store } from "@/store";

import type { FlatIndexSchema } from "@upstash/redis";

const CLIENT_SEARCH_INDEX = "idx:clients";

const CLIENT_SEARCH_SCHEMA = {
  email: "TEXT",
  name: "TEXT",
  phoneNumber: "TEXT",
} as const satisfies FlatIndexSchema;

const deleteClient = async (
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

  const phoneNumber = `${formData.get("phoneNumber") ?? ""}`.trim();

  if (!phoneNumber) {
    return {
      message: "Phone number is required",
      type: "error",
    };
  }

  await store.clients.delete(phoneNumber);

  const index = redis.search.index({
    name: CLIENT_SEARCH_INDEX,
    schema: CLIENT_SEARCH_SCHEMA,
  });

  await index.waitIndexing();
  redirect("/admin/clients");
};

export { deleteClient };

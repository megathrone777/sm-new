"use server";
import { randomUUID } from "crypto";

import { revalidatePath } from "next/cache";

import { helpers } from "@/db";

const createOrder = async (formData: FormData): Promise<void> => {
  const name = formData.get("name");
  const price = formData.get("price");

  await helpers.appendJSON(
    "orders",
    "$",
    JSON.stringify({
      id: randomUUID(),
      name,
      price,
    }),
  );

  console.log("created");
  revalidatePath("/");
};

export { createOrder };

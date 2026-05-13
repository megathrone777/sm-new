"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateStatus = async (id: TOrder["id"], status: TOrderStatus): Promise<void> => {
  const session = await store.sessions.get();

  if (!session) return;

  await store.orders.update(id, { status });
  revalidatePath("/orders");
};

export { updateStatus };

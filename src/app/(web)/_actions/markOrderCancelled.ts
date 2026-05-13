"use server";
import { redirect } from "next/navigation";

import { store } from "@/store";

const markOrderCancelled = async (formData: FormData): Promise<void> => {
  const id = +`${formData.get("id") ?? 0}`;

  if (!id) return;

  const order = await store.orders.getById(id);

  if (!order) return;

  await store.orders.update(id, {
    comgateProcessedAt: new Date().toISOString(),
    onlinePaymentStatus: "CANCELLED",
  });
  redirect("/order-declined");
};

export { markOrderCancelled };

"use server";
import { redirect } from "next/navigation";

import { store } from "@/store";

const markOrderPaid = async (formData: FormData): Promise<void> => {
  const id = +`${formData.get("id") ?? 0}`;

  if (!id) return;

  const order = await store.orders.getById(id);

  if (!order) return;

  await store.orders.update(id, {
    comgateProcessedAt: new Date().toISOString(),
    comgateTransId: `sim-${id}-${Date.now()}`,
    onlinePaymentStatus: "PAID",
  });
  redirect(`/order-confirmed/${id}`);
};

export { markOrderPaid };

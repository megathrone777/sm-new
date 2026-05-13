"use server";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { sendOrderCreatedSms, sendOrderEmail } from "@/services";
import { store } from "@/store";

const markOrderPaid = async (formData: FormData): Promise<void> => {
  const id = +`${formData.get("id") ?? 0}`;

  if (!id) return;

  const order = await store.orders.getById(id);

  if (!order) return;

  const paidPatch = {
    comgateProcessedAt: new Date().toISOString(),
    comgateTransId: `sim-${id}-${Date.now()}`,
    onlinePaymentStatus: "PAID" as const,
  };

  await store.orders.update(id, paidPatch);
  const paidOrder: TOrder = { ...order, ...paidPatch };

  after(async (): Promise<void> => {
    await Promise.allSettled([sendOrderEmail(paidOrder), sendOrderCreatedSms(paidOrder)]);
  });
  redirect(`/order-confirmed/${id}`);
};

export { markOrderPaid };

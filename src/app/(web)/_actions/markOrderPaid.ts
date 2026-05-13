"use server";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { sendOrderConfirmation } from "@/emailTemplate/sendOrderConfirmation";
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
  after((): void => {
    void sendOrderConfirmation({ ...order, ...paidPatch });
  });
  redirect(`/order-confirmed/${id}`);
};

export { markOrderPaid };

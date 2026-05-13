"use server";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

import { sendOrderStatusSms } from "@/sms/sendOrderStatusSms";
import { realtime, store } from "@/store";

const updateStatus = async (id: TOrder["id"], status: TOrderStatus): Promise<void> => {
  const session = await store.sessions.get();

  if (!session) return;
  const order = await store.orders.getById(id);

  if (!order) return;
  await store.orders.update(id, { status });
  revalidatePath("/orders");
  after(async (): Promise<void> => {
    realtime.emit("orderStatusChanged", { id, status, updatedAt: Date.now() });
    await sendOrderStatusSms(order, status);
  });
};

export { updateStatus };

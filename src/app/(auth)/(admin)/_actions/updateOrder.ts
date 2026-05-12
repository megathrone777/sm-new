"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateOrder = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = `${formData.get("id") ?? ""}`.trim();
  const status = formData.get("status") as TOrderStatus;
  const courier = ((formData.get("courier") as string) ?? "").trim();
  const note = ((formData.get("note") as string) ?? "").trim();
  const deliveryTime = ((formData.get("deliveryTime") as string) ?? "").trim();

  if (!id) {
    return { message: "Order ID is required", type: "error" };
  }

  const existing = await store.orders.getById(+id);

  if (!existing) {
    return { message: `Order #${id} not found`, type: "error" };
  }

  await store.orders.update(+id, { courier, deliveryTime, note, status });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/order/${id}`);

  return { message: `Order #${id} successfully updated`, type: "success" };
};

export { updateOrder };

"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { ordersHelpers } from "@/helpers/orders";
import { ordersStore } from "@/store";

const updateOrder = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = (formData.get("id") as string).trim();
  const status = formData.get("status") as TOrderStatus;
  const courier = ((formData.get("courier") as string) ?? "").trim();
  const note = ((formData.get("note") as string) ?? "").trim();
  const deliveryTime = ((formData.get("deliveryTime") as string) ?? "").trim();

  if (!id) {
    return { message: "Order ID is required", type: "error" };
  }

  const existing = await ordersHelpers.getOrderById(id);

  if (!existing) {
    return { message: `Order #${id} not found`, type: "error" };
  }

  await ordersStore.update(id, { courier, deliveryTime, note, status });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/order/${id}`);

  return { message: `Order #${id} successfully updated`, type: "success" };
};

export { updateOrder };

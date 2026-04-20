"use server";
import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { ordersHelpers } from "@/helpers/orders";
import { ordersStore } from "@/store";

const deleteOrder = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = formData.get("id") as string;

  if (!id) {
    return { message: "Order ID is required", type: "error" };
  }

  const order = await ordersHelpers.getOrderById(id);

  if (!order) {
    return { message: `Order #${id} not found`, type: "error" };
  }

  await ordersStore.delete(id, order);
  revalidatePath("/admin/orders");

  return { message: `Order #${id} successfully deleted`, type: "success" };
};

export { deleteOrder };

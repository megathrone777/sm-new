"use server";
import { revalidatePath } from "next/cache";

import { authHelpers, ordersHelpers } from "@/helpers";
import { redis } from "@/lib";

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

  const pipeline = redis.pipeline();

  pipeline.del(`order:${id}`);
  pipeline.zrem("orders", id);

  if (order.clientPhoneNumber) {
    pipeline.zrem(`orders:phone:${order.clientPhoneNumber}`, id);
  }

  if (order.promocode) {
    pipeline.zrem(`promocode:${order.promocode}:orders`, id);
  }

  await pipeline.exec();
  revalidatePath("/admin/orders");

  return { message: `Order #${id} successfully deleted`, type: "success" };
};

export { deleteOrder };

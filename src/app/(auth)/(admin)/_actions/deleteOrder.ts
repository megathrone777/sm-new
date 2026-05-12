"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteOrder = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = formData.get("id") as string;

  if (!id) {
    return { message: "Order ID is required", type: "error" };
  }

  const order = await store.orders.getById(+id);

  if (!order) {
    return { message: `Order #${id} not found`, type: "error" };
  }

  await store.orders.delete(+id, order);
  revalidatePath("/admin/orders");

  return { message: `Order #${id} successfully deleted`, type: "success" };
};

export { deleteOrder };

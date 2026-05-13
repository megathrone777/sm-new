"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteDeliveryCondition = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = +(formData.get("id") ?? 0);

  if (!id) {
    return { message: "Id is required", type: "error" };
  }

  await store.deliveryConditions.delete(id);
  revalidatePath("/admin/deliveryConditions");

  return { message: "Delivery condition deleted", type: "success" };
};

export { deleteDeliveryCondition };

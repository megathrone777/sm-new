"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const createDeliveryCondition = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const title = `${formData.get("title") ?? ""}`.trim();
  const distanceFrom = +(formData.get("distanceFrom") ?? 0);
  const distanceTo = +(formData.get("distanceTo") ?? 0);
  const price = +(formData.get("price") ?? 0);
  const minimumOrderPrice = +(formData.get("minimumOrderPrice") ?? 0);
  const text = `${formData.get("text") ?? ""}`.trim();

  if (!title) {
    return { message: "Title is required", type: "error" };
  }

  if (distanceTo <= distanceFrom) {
    return { message: "distanceTo must be greater than distanceFrom", type: "error" };
  }

  const existing = await store.deliveryConditions.getAll();
  const overlap = existing.find(
    (condition) => distanceFrom < condition.distanceTo && distanceTo > condition.distanceFrom,
  );

  if (overlap) {
    return {
      message: `Distance range overlaps with "${overlap.title}" (${overlap.distanceFrom}–${overlap.distanceTo}m)`,
      type: "error",
    };
  }

  const condition: TDeliveryCondition = {
    distanceFrom,
    distanceTo,
    id: Date.now(),
    minimumOrderPrice,
    price,
    text,
    title,
  };

  await store.deliveryConditions.set(condition);
  revalidatePath("/admin/deliveryConditions");

  return { message: `Delivery condition "${title}" created`, type: "success" };
};

export { createDeliveryCondition };

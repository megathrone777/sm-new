"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateDeliveryCondition = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const id = +(formData.get("id") ?? 0);
  const title = `${formData.get("title") ?? ""}`.trim();
  const distanceFrom = +(formData.get("distanceFrom") ?? 0);
  const distanceTo = +(formData.get("distanceTo") ?? 0);
  const price = +(formData.get("price") ?? 0);
  const minimumOrderPrice = +(formData.get("minimumOrderPrice") ?? 0);
  const text = `${formData.get("text") ?? ""}`.trim();

  if (!id) {
    return { message: "Id is required", type: "error" };
  }

  if (!title) {
    return { message: "Title is required", type: "error" };
  }

  if (distanceTo <= distanceFrom) {
    return { message: "distanceTo must be greater than distanceFrom", type: "error" };
  }

  const existing = await store.deliveryConditions.getAll();
  const overlap = existing.find(
    (condition) =>
      condition.id !== id &&
      distanceFrom < condition.distanceTo &&
      distanceTo > condition.distanceFrom,
  );

  if (overlap) {
    return {
      message: `Distance range overlaps with "${overlap.title}" (${overlap.distanceFrom}–${overlap.distanceTo}m)`,
      type: "error",
    };
  }

  await store.deliveryConditions.set({
    distanceFrom,
    distanceTo,
    id,
    minimumOrderPrice,
    price,
    text,
    title,
  });
  revalidatePath("/admin/deliveryConditions");

  return { message: `Delivery condition "${title}" updated`, type: "success" };
};

export { updateDeliveryCondition };

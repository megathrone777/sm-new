"use server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

const deleteProduct = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const slug = formData.get("id") as string;
  const title = formData.get("title");
  const product = await store.products.getBySlug(slug);

  if (!product) {
    return {
      message: "Product not found",
      type: "error",
    };
  }

  if (product.imageUrl.includes("blob.vercel-storage.com")) {
    await del(product.imageUrl).catch((): void => {});
  }

  await store.products.delete(slug, product.id);
  revalidatePath("/admin/products");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteProduct };

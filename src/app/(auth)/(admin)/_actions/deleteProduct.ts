"use server";
import fs from "fs/promises";
import path from "path";

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

  if (product.imageUrl) {
    const filePath = path.join(process.cwd(), "public", product.imageUrl);

    await fs.unlink(filePath).catch(() => {});
  }

  await store.products.delete(slug, product.id);
  revalidatePath("/admin/products");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteProduct };

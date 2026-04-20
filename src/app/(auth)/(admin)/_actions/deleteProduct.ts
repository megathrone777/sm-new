"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { authHelpers } from "@/helpers/auth";
import { productsHelpers } from "@/helpers/products";
import { productsStore } from "@/store";

const deleteProduct = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const slug = formData.get("id") as string;
  const title = formData.get("title");
  const product = await productsHelpers.getProductBySlug(slug);

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

  await productsStore.delete(slug, product.id);
  revalidatePath("/admin/products");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteProduct };

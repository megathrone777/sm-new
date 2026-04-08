"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { authHelpers, productsHelpers } from "@/helpers";
import { redis } from "@/lib";

const PRODUCTS_SEARCH_PREFIX = "product:";

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

  const pipeline = redis.pipeline();

  pipeline.hdel("products", slug);
  pipeline.del(`${PRODUCTS_SEARCH_PREFIX}${product.id}`);
  await pipeline.exec();
  revalidatePath("/admin/products");

  return {
    message: `"${title}" deleted successfully.`,
    type: "success",
  };
};

export { deleteProduct };

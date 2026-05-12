"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";

import { store } from "@/store";

const updateProduct = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<null | TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const slug = formData.get("slug") as string;
  const prevProduct = await store.products.getBySlug(slug);

  if (!prevProduct) {
    return {
      message: `Product ${slug} not found`,
      type: "error",
    };
  }

  const modifierIds = formData.getAll("modifierIds").map(Number);
  const allModifiers = await store.modifiers.getAll();
  const modifiers = allModifiers.filter(({ id }) => modifierIds.includes(id));

  const newProduct: TProduct = {
    ...prevProduct,
    allergens: `${formData.get("allergens") ?? ""}`.trim() || null,
    categoryId: +formData.get("categoryId")! || prevProduct.categoryId,
    composition: `${formData.get("composition") ?? ""}`.trim(),
    description: `${formData.get("description") ?? ""}`.trim() || null,
    imageUrl: prevProduct.imageUrl,
    isAvailable: formData.get("isAvailable") === "on",
    modifiers,
    modifiersTitle: `${formData.get("modifiersTitle") ?? ""}`.trim() || null,
    price: +formData.get("price")!,
    requiredModifier: formData.get("requiredModifier") === "on",
    sortOrder: +formData.get("sortOrder")!,
    title: `${formData.get("title") ?? ""}`,
    weight: `${formData.get("weight") ?? ""}`,
  };
  const imageFile = formData.get("image") as File;

  if (imageFile?.size) {
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `${Date.now()}${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", "products", filename);

    await fs.writeFile(filePath, Buffer.from(await imageFile.arrayBuffer()));

    if (prevProduct.imageUrl) {
      await fs.unlink(path.join(process.cwd(), "public", prevProduct.imageUrl)).catch(() => {});
    }

    newProduct.imageUrl = `/uploads/products/${filename}`;
  }

  await store.products.set(newProduct);

  revalidatePath(`/admin/product/${slug}`);

  return {
    message: `Product "${newProduct.title}" updated`,
    type: "success",
  };
};

export { updateProduct };

"use server";
import { del, put } from "@vercel/blob";
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
    const blob = await put(`products/${Date.now()}-${imageFile.name}`, imageFile, {
      access: "public",
    });

    if (prevProduct.imageUrl.includes("blob.vercel-storage.com")) {
      await del(prevProduct.imageUrl).catch((): void => {});
    }

    newProduct.imageUrl = blob.url;
  }

  await store.products.set(newProduct);

  revalidatePath(`/admin/product/${slug}`);

  return {
    message: `Product "${newProduct.title}" updated`,
    type: "success",
  };
};

export { updateProduct };

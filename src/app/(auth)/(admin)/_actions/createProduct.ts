"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { store } from "@/store";
import { slugify } from "@/utils";

const createProduct = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await store.sessions.get();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const title = `${formData.get("title") ?? ""}`.trim();

  if (!title) return { message: "Title is required", type: "error" };

  const price = +formData.get("price")!;
  const weight = `${formData.get("weight") ?? ""}`.trim();
  const composition = `${formData.get("composition") ?? ""}`.trim();
  const categoryId = +formData.get("categoryId")!;
  const allergens = `${formData.get("allergens") ?? ""}`.trim() || null;
  const description = `${formData.get("description") ?? ""}`.trim() || null;
  const modifiersTitle = `${formData.get("modifiersTitle") ?? ""}`.trim() || null;
  const isAvailable = formData.get("isAvailable") === "on";
  const requiredModifier = formData.get("requiredModifier") === "on";
  const modifierIds = formData.getAll("modifierIds").map(Number);

  const [existing, allModifiers, categories] = await Promise.all([
    store.products.getAll(),
    store.modifiers.getAll(),
    store.categories.getAll(),
  ]);

  if (categoryId && !categories.find((c) => c.id === categoryId)) {
    return { message: "Invalid category", type: "error" };
  }

  const id = existing.length ? Math.max(...existing.map(({ id }) => id)) + 1 : 1;
  const sortOrder = existing.length
    ? Math.max(...existing.map(({ sortOrder }) => sortOrder)) + 1
    : 1;

  const baseSlug = slugify(title);
  const existingSlugs = new Set(existing.map(({ slug }) => slug));
  let slug = baseSlug;
  let counter = 2;

  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const modifiers = allModifiers.filter(({ id: mid }: TModifier) => modifierIds.includes(mid));
  const category = categories.find((category: TProductCategory) => category.id === categoryId);

  const product: TProduct = {
    allergens,
    categoryId,
    composition,
    description,
    fbCategoryId: category?.fbCategoryId ?? null,
    fbDescription: null,
    fbUpload: false,
    freeCutleryCount: 0,
    googleCategoryId: category?.googleCategoryId ?? null,
    id,
    imageUrl: "",
    isAvailable,
    isMultipleModifiers: null,
    isPromotionActive: category?.isPromotionActive ?? false,
    isTopProduct: false,
    modifiers,
    modifiersTitle,
    price,
    promotionDiscountAmount: category?.promotionDiscountAmount ?? 0,
    promotionForEveryXProducts: category?.promotionForEveryXProducts ?? 0,
    requiredCutlery: false,
    requiredModifier,
    slug,
    sortOrder,
    title,
    weight,
  };

  const imageFile = formData.get("image") as File;

  if (imageFile?.size) {
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `${Date.now()}${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", "products", filename);

    await fs.writeFile(filePath, Buffer.from(await imageFile.arrayBuffer()));
    product.imageUrl = `/uploads/products/${filename}`;
  }

  await store.products.set(product);

  revalidatePath("/admin/products");
  redirect(`/admin/product/${slug}`);
};

export { createProduct };

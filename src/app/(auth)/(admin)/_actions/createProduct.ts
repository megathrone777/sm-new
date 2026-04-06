"use server";
import fs from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authHelpers, modifiersHelpers, productsHelpers } from "@/helpers";
import { redis } from "@/lib";
import { slugify } from "@/utils";

const PRODUCTS_SEARCH_PREFIX = "product:";

const createProduct = async (
  _state: null | TActionResult,
  formData: FormData,
): Promise<TActionResult> => {
  const session = await authHelpers.getSession();

  if (!session || session.role !== "admin") {
    return { message: "Unauthorized", type: "error" };
  }

  const title = (formData.get("title") as string).trim();

  if (!title) return { message: "Title is required", type: "error" };

  const price = Number(formData.get("price") ?? 0);
  const weight = (formData.get("weight") as string).trim();
  const composition = (formData.get("composition") as string).trim();
  const categoryId = Number(formData.get("categoryId"));
  const allergens = (formData.get("allergens") as string).trim() || null;
  const description = (formData.get("description") as string).trim() || null;
  const modifiersTitle = (formData.get("modifiersTitle") as string).trim() || null;
  const isAvailable = formData.get("isAvailable") === "on";
  const requiredModifier = formData.get("requiredModifier") === "on";
  const modifierIds = formData.getAll("modifierIds").map(Number);

  const [existing, allModifiers, categories] = await Promise.all([
    productsHelpers.getProducts(),
    modifiersHelpers.getModifiers(),
    productsHelpers.getCategories(),
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

  const modifiers = allModifiers.filter(({ id: mid }) => modifierIds.includes(mid));
  const category = categories.find((c) => c.id === categoryId);

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

  const pipeline = redis.pipeline();

  pipeline.hset("products", { [slug]: JSON.stringify(product) });
  pipeline.hset(`${PRODUCTS_SEARCH_PREFIX}${id}`, {
    id,
    imageUrl: product.imageUrl,
    price,
    slug,
    title,
  });

  await pipeline.exec();

  revalidatePath("/admin/products");
  redirect(`/admin/product/${slug}`);
};

export { createProduct };

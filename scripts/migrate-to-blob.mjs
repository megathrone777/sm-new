// One-time migration: upload all /uploads/... images to Vercel Blob and update Redis URLs.
// Run from project root: node --env-file=.env.local scripts/migrate-to-blob.mjs
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { Redis } from "@upstash/redis";
import { put } from "@vercel/blob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

const redis = new Redis({
  token: process.env.REDIS_API_TOKEN,
  url: process.env.REDIS_API_URL,
});

const isLocalUpload = (url) => typeof url === "string" && url.startsWith("/uploads/");

async function uploadFile(localUrl, folder) {
  const filePath = path.join(PUBLIC_DIR, localUrl);
  const filename = path.basename(localUrl);
  const buffer = await fs.readFile(filePath);
  const file = new File([buffer], filename);
  const blob = await put(`${folder}/${Date.now()}-${filename}`, file, { access: "public" });
  return blob.url;
}

async function migrateProducts() {
  const raw = await redis.hgetall("products");
  if (!raw) return;

  let count = 0;
  const pipeline = redis.pipeline();

  for (const [slug, value] of Object.entries(raw)) {
    const product = typeof value === "string" ? JSON.parse(value) : value;
    if (!isLocalUpload(product.imageUrl)) continue;

    console.log(`  product: ${slug} → ${product.imageUrl}`);
    const newUrl = await uploadFile(product.imageUrl, "products");
    const updated = { ...product, imageUrl: newUrl };

    pipeline.hset("products", { [slug]: JSON.stringify(updated) });
    pipeline.hset(`product:${product.id}`, { imageUrl: newUrl });
    count++;
  }

  if (count) await pipeline.exec();
  console.log(`products: migrated ${count}`);
}

async function migrateCategories() {
  const raw = await redis.hgetall("categories");
  if (!raw) return;

  let count = 0;
  const pipeline = redis.pipeline();

  for (const [id, value] of Object.entries(raw)) {
    const category = typeof value === "string" ? JSON.parse(value) : value;
    if (!isLocalUpload(category.imageUrl)) continue;

    console.log(`  category: ${id} → ${category.imageUrl}`);
    const newUrl = await uploadFile(category.imageUrl, "categories");
    const updated = { ...category, imageUrl: newUrl };

    pipeline.hset("categories", { [id]: JSON.stringify(updated) });
    count++;
  }

  if (count) await pipeline.exec();
  console.log(`categories: migrated ${count}`);
}

async function migrateAbout() {
  const raw = await redis.hgetall("shop:about");
  if (!raw || !isLocalUpload(raw.imageUrl)) {
    console.log("about: nothing to migrate");
    return;
  }

  console.log(`  about → ${raw.imageUrl}`);
  const newUrl = await uploadFile(raw.imageUrl, "about");
  await redis.hset("shop:about", { imageUrl: newUrl });
  console.log("about: migrated 1");
}

async function migrateShopImages() {
  const raw = await redis.hgetall("shop:imageUrls");
  if (!raw) {
    console.log("shop images: nothing to migrate");
    return;
  }

  let count = 0;
  const pipeline = redis.pipeline();

  for (const [key, url] of Object.entries(raw)) {
    if (!isLocalUpload(url)) continue;

    console.log(`  shop image: ${key} → ${url}`);
    const newUrl = await uploadFile(url, "settings");
    pipeline.hset("shop:imageUrls", { [key]: newUrl });
    count++;
  }

  if (count) await pipeline.exec();
  console.log(`shop images: migrated ${count}`);
}

async function migrateReviews() {
  const raw = await redis.hgetall("reviews");
  if (!raw) {
    console.log("reviews: nothing to migrate");
    return;
  }

  let count = 0;
  const pipeline = redis.pipeline();

  for (const [id, value] of Object.entries(raw)) {
    const review = typeof value === "string" ? JSON.parse(value) : value;
    let updated = { ...review };
    let changed = false;

    if (isLocalUpload(review.imageUrl)) {
      console.log(`  review ${id} imageUrl → ${review.imageUrl}`);
      updated.imageUrl = await uploadFile(review.imageUrl, "reviews");
      changed = true;
    }
    if (isLocalUpload(review.ratingImageUrl)) {
      console.log(`  review ${id} ratingImageUrl → ${review.ratingImageUrl}`);
      updated.ratingImageUrl = await uploadFile(review.ratingImageUrl, "reviews");
      changed = true;
    }

    if (changed) {
      pipeline.hset("reviews", { [id]: JSON.stringify(updated) });
      count++;
    }
  }

  if (count) await pipeline.exec();
  console.log(`reviews: migrated ${count}`);
}

console.log("Starting migration...\n");
await migrateProducts();
await migrateCategories();
await migrateAbout();
await migrateShopImages();
await migrateReviews();
console.log("\nDone.");

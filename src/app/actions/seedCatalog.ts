// "use server";
// import { categories } from "@/app/p";
// import { redis } from "@/lib";

// const seedCatalog = async (): Promise<void> => {
//   const productsBatch: Record<string, string> = {};
//   const categoriesBatch: Record<string, string> = {};

//   for (const category of categories) {
//     for (const product of category.products) {
//       productsBatch[product.slug] = JSON.stringify(product);
//     }
//     categoriesBatch[String(category.id)] = JSON.stringify(category);
//   }

//   const pipeline = redis.pipeline();

//   pipeline.hset("products", productsBatch);
//   pipeline.hset("categories", categoriesBatch);
//   await pipeline.exec();
// };

// export { seedCatalog };

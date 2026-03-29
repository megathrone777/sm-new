import { redis } from "@/lib";

const getCategoriesWithProducts = async (): Promise<TProductCategory[]> => {
  const [categories, products] = await Promise.all([
    redis.hgetall<Record<string, TProductCategory>>("categories"),
    redis.hgetall<Record<string, TProduct>>("products"),
  ]);

  if (!categories) return [];
  if (!products) return [];

  const sortedCategories: TProductCategory[] = Object.values(categories).sort(
    (categoryA: TProductCategory, categoryB: TProductCategory): number =>
      (categoryA.sortOrder ?? 0) - (categoryB.sortOrder ?? 0),
  );

  return [
    {
      id: 0,
      imageUrl: "/uploads/all_pr_352e3084a2_f2e3c82632_89967dca5a.jpg",
      isPromotionActive: false,
      products: Object.values(products),
      promotionDiscountAmount: 0,
      promotionForEveryXProducts: 0,
      sortOrder: 0,
      title: "Vše produkty",
    },
    ...sortedCategories,
  ];
};

export { getCategoriesWithProducts };

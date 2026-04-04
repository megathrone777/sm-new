import { redis } from "@/lib";

const getCategories = async (): Promise<TProductCategory[]> => {
  const categories = await redis.hgetall<Record<string, TProductCategory>>("categories");

  if (!categories) return [];

  return [
    {
      id: 0,
      imageUrl: "/uploads/all_pr_352e3084a2_f2e3c82632_89967dca5a.jpg",
      isPromotionActive: false,
      products: Object.values(categories)
        .sort(
          (categoryA: TProductCategory, categoryB: TProductCategory): number =>
            categoryA.sortOrder - categoryB.sortOrder,
        )
        .reduce<TProduct[]>(
          (accumulator, { products }) => [
            ...accumulator,
            ...products.sort((productA, productB) => productA.sortOrder - productB.sortOrder),
          ],
          [],
        ),
      promotionDiscountAmount: 0,
      promotionForEveryXProducts: 0,
      sortOrder: -1,
      title: "Vše produkty",
    },
    ...Object.values(categories).map(
      ({ products, ...category }: TProductCategory): TProductCategory => ({
        ...category,
        products: products.sort(
          (productA: TProduct, productB: TProduct): number =>
            productA.sortOrder - productB.sortOrder,
        ),
      }),
    ),
  ].sort(
    (categoryA: TProductCategory, categoryB: TProductCategory): number =>
      categoryA.sortOrder - categoryB.sortOrder,
  );
};

export { getCategories };

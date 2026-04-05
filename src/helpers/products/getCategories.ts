import { redis } from "@/lib";

const getCategories = async (): Promise<TProductCategory[]> => {
  const [categoriesMap, productsMap] = await Promise.all([
    redis.hgetall<Record<string, TProductCategory>>("categories"),
    redis.hgetall<Record<string, TProduct>>("products"),
  ]);

  if (!categoriesMap) return [];

  const allProducts = productsMap
    ? Object.values(productsMap).sort(
        (a: TProduct, b: TProduct): number => a.sortOrder - b.sortOrder,
      )
    : [];

  const categories = Object.values(categoriesMap)
    .map(
      (category: TProductCategory): TProductCategory => ({
        ...category,
        products: allProducts.filter(
          (product: TProduct): boolean => product.categoryId === category.id,
        ),
      }),
    )
    .sort(
      (a: TProductCategory, b: TProductCategory): number => a.sortOrder - b.sortOrder,
    );

  return [
    {
      id: 0,
      imageUrl: "/uploads/all_pr_352e3084a2_f2e3c82632_89967dca5a.jpg",
      isPromotionActive: false,
      products: categories.reduce<TProduct[]>(
        (accumulator, { products }) => [...accumulator, ...products],
        [],
      ),
      promotionDiscountAmount: 0,
      promotionForEveryXProducts: 0,
      sortOrder: -1,
      title: "Vše produkty",
    },
    ...categories,
  ].sort(
    (a: TProductCategory, b: TProductCategory): number => a.sortOrder - b.sortOrder,
  );
};

export { getCategories };

import { redis } from "@/lib";
import { sortByOrder } from "@/utils";

const getCategories = async (): Promise<TProductCategory[]> => {
  const [categoriesMap, productsMap] = await Promise.all([
    redis.hgetall<Record<string, TProductCategory>>("categories"),
    redis.hgetall<Record<string, TProduct>>("products"),
  ]);

  if (!categoriesMap) return [];
  const products = productsMap ? sortByOrder(Object.values(productsMap)) : [];
  const allProducts = sortByOrder(Object.values(categoriesMap)).reduce<TProduct[]>(
    (accumulator, category) => {
      if (category.id === 0) {
        return accumulator;
      }

      return [
        ...accumulator,
        ...products.filter((product: TProduct): boolean => product.categoryId === category.id),
      ];
    },
    [],
  );

  const categories = Object.values(categoriesMap).map(
    (category: TProductCategory): TProductCategory => {
      if (category.sortOrder === 0) {
        return {
          ...category,
          products: allProducts,
        };
      }

      return {
        ...category,
        products: products.filter(
          (product: TProduct): boolean => product.categoryId === category.id,
        ),
      };
    },
  );

  return sortByOrder(categories);
};

export { getCategories };

import { redis } from "@/store";
import { sortByOrder } from "@/utils";

const getCategories = async (): Promise<TProductCategory[]> => {
  const [categoriesMap, productsMap] = await redis
    .pipeline()
    .hgetall<Record<string, TProductCategory>>("categories")
    .hgetall<Record<string, TProduct>>("products")
    .exec<[null | Record<string, TProductCategory>, null | Record<string, TProduct>]>();

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

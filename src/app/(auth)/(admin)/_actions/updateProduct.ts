"use server";
import { productsHelpers } from "@/helpers";
import { redis } from "@/lib";

const updateProduct = async (newProduct: TProduct): Promise<void> => {
  const prevProduct = await productsHelpers.getProductBySlug(newProduct.slug);

  if (!prevProduct) throw new Error(`Product ${newProduct.slug} not found`);
  const categoryMoved = prevProduct.categoryId !== newProduct.categoryId;
  const [oldCategory, newCategory] = await Promise.all([
    productsHelpers.getCategoryById(prevProduct.categoryId),
    categoryMoved ? productsHelpers.getCategoryById(newProduct.categoryId) : Promise.resolve(null),
  ]);

  if (!oldCategory) throw new Error(`Category ${prevProduct.categoryId} not found`);
  if (categoryMoved && !newCategory) throw new Error(`Category ${newProduct.categoryId} not found`);
  const pipeline = redis.pipeline();

  pipeline.hset("products", { [newProduct.slug]: JSON.stringify(newProduct) });

  if (categoryMoved) {
    pipeline.hset("categories", {
      [prevProduct.categoryId]: JSON.stringify({
        ...oldCategory,
        products: oldCategory.products.filter(({ id }: TProduct): boolean => id !== newProduct.id),
      }),
    });
    pipeline.hset("categories", {
      [newProduct.categoryId]: JSON.stringify({
        ...newCategory!,
        products: [...newCategory!.products, newProduct],
      }),
    });
  } else {
    pipeline.hset("categories", {
      [newProduct.categoryId]: JSON.stringify({
        ...oldCategory,
        products: oldCategory.products.map(
          (product: TProduct): TProduct => (product.id === newProduct.id ? newProduct : product),
        ),
      }),
    });
  }

  await pipeline.exec();
};

export { updateProduct };

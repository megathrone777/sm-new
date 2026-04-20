import { productsStore } from "@/store";

const getProductBySlug = (slug: string): Promise<null | TProduct> =>
  productsStore.getBySlug(slug);

export { getProductBySlug };

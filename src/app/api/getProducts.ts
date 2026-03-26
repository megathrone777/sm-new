import { getClient } from "~/redis";

const getProducts = async (): Promise<TProduct[]> => {
  try {
    const client = await getClient();
    const products = (await client.json.get("products")) as TProduct[] | null;

    if (products && !!products.length) {
      return products;
    }

    return [];
  } catch (error) {
    console.error("Cannot get products: ", error);

    return [];
  }
};

export { getProducts };

import { getClient } from "~/lib";

const getProducts = async (): Promise<TProduct[]> => {
  try {
    const client = await getClient();
    const products = await client.hGetAll("products");

    if (products) {
      return Object.keys(products).map((id): TProduct => JSON.parse(products[id]));
    }

    return [];
  } catch (error) {
    console.error("Cannot get products: ", error);

    return [];
  }
};

export { getProducts };

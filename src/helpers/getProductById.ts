// import { getClient } from "~/lib";

// export const getProductById = async (id: string): Promise<TProduct | null> => {
//   try {
//     const client = await getClient();
//     const product = await client.hGet("products", id);

//     return product ? JSON.parse(product) : null;
//   } catch (error) {
//     console.error("Cannot find product: ", error);

//     return null;
//   }
// };

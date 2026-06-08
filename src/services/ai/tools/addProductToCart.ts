import { tool, type Tool } from "ai";
import { number, object } from "zod";

import { addToCart } from "@/app/(web)/_actions";

const addProductSchema = object({
  productId: number().int().describe("ID produktu ze seznamu"),
  quantity: number().int().min(1).describe("Množství"),
});

const addProductToCart = (
  products: TProduct[],
): Tool<
  {
    productId: number;
    quantity: number;
  },
  string
> =>
  tool({
    description: "Přidá produkt do košíku podle jeho ID.",
    execute: async ({ productId, quantity }) => {
      const product = products.find(({ id }: TProduct): boolean => id === productId);

      if (!product) return `Produkt s ID ${productId} nebyl nalezen.`;

      await addToCart(null, {
        ...product,
        modifiers: [],
        quantity,
        totalPrice: product.price * quantity,
      });

      return `${product.title} (${quantity}x) přidán do košíku.`;
    },
    inputSchema: addProductSchema,
  });

export { addProductToCart };

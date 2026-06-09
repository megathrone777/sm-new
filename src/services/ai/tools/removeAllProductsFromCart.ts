import { tool } from "ai";
import { object, string } from "zod";

import { clearCart } from "@/app/(web)/_actions";

const inputSchema = object({
  message: string().min(1).describe("Completely remove all products from cart"),
});

const removeAllProductsFromCart = tool({
  description: "Clear cart using clearCart server action and return message about empty cart",
  execute: async () => {
    await clearCart();

    return "Košík byl vyprázdněn.";
  },
  inputSchema,
});

export { removeAllProductsFromCart };

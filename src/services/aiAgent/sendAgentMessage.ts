"use server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText, stepCountIs, tool } from "ai";
import { number, object } from "zod";

import { addToCart } from "@/app/(web)/_actions";
import { store } from "@/store";

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const addProductSchema = object({
  productId: number().int().describe("ID produktu ze seznamu"),
  quantity: number().int().min(1).describe("Množství"),
});

const sendAgentMessage = async (message: string): Promise<TActionResult> => {
  const categories = await store.categories.getAll();
  const products = categories.flatMap((c) => c.products).filter((p) => p.isAvailable);

  const catalog = products
    .map((p) => `[ID:${p.id}] ${p.title} — ${p.price} Kč (kategorie: ${p.categoryId})`)
    .join("\n");

  const { text } = await generateText({
    allowSystemInMessages: true,
    messages: [
      {
        content: `Vždy odpovídej česky. Jsi asistent sushi restaurace SushiMan.
Dostupné produkty:
${catalog}

Pokud chce uživatel přidat produkty do košíku, použij nástroj addProductToCart s ID ze seznamu výše.`,
        role: "system",
      },
      { content: message, role: "user" },
    ],
    model: anthropic("claude-haiku-4-5"),
    stopWhen: stepCountIs(5),
    tools: {
      addProductToCart: tool({
        description: "Přidá produkt do košíku podle jeho ID.",
        execute: async ({ productId, quantity }) => {
          const product = products.find((p) => p.id === productId);

          if (!product) return `Produkt s ID ${productId} nebyl nalezen.`;

          await addToCart(null, {
            ...product,
            modifiers: [] as TCartModifier[],
            quantity,
            totalPrice: product.price * quantity,
          });

          return `${product.title} (${quantity}x) přidán do košíku.`;
        },
        inputSchema: addProductSchema,
      }),
    },
  });

  return { message: text, type: "success" };
};

export { sendAgentMessage };

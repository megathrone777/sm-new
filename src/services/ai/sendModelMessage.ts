"use server";
import { generateText, stepCountIs, type ModelMessage } from "ai";

import { store } from "@/store";

import { model } from "./model";
import { addProductToCart } from "./tools";

const sendModelMessage = async (
  message: string,
  history: ModelMessage[] = [],
): Promise<TActionResult> => {
  const categories: TProductCategory[] = await store.categories.getAll();
  const products: TProduct[] = categories
    .flatMap(({ products }: TProductCategory) => products)
    .filter(({ isAvailable }) => isAvailable);

  const catalog = products
    .map<string>(({ allergens, categoryId, composition, id, price, title, weight }: TProduct) => {
      const parts = [`[ID:${id}] ${title} — ${price} Kč`];

      if (weight) parts.push(`hmotnost: ${weight}`);
      if (composition) parts.push(`složení: ${composition}`);
      if (allergens) parts.push(`alergeny: ${allergens}`);
      parts.push(`kategorie: ${categoryId}`);

      return parts.join(" | ");
    })
    .join("\n");

  const { text } = await generateText({
    allowSystemInMessages: true,
    messages: [
      {
        content: `
          Vždy odpovídej česky. Jsi asistent sushi restaurace SushiMan.
          Dostupné produkty:
          ${catalog}

          Pokud chce uživatel přidat produkty do košíku, použij nástroj addProductToCart 
          s ID ze seznamu výše.
        `,
        role: "system",
      },
      ...history.slice(-10),
      { content: message, role: "user" },
    ],
    model,
    stopWhen: stepCountIs(5),
    tools: {
      addProductToCart: addProductToCart(products),
    },
  });

  return { message: text, type: "success" };
};

export { sendModelMessage };

"use server";
import { generateText, stepCountIs, type ModelMessage } from "ai";

import { getTranslation } from "@/dictionaries";
import { store } from "@/store";

import { model } from "./model";
import { addProductToCart, checkDeliveryZone, removeAllProductsFromCart } from "./tools";

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
      const parts = [`[ID:${id}] ${title} — ${price} ${getTranslation("currency")}`];

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
          You are an assistant for SushiMan sushi restaurant. Always reply in the same language the user writes in (Czech, English, or Russian).
          Dostupné produkty:
          ${catalog}

          Pokud chce uživatel přidat produkty do košíku, použij nástroj addProductToCart
          s ID ze seznamu výše.
          Pokud se uživatel ptá, zda dovážíme na jeho adresu, použij nástroj checkDeliveryZone.
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
      checkDeliveryZone,
      removeAllProductsFromCart,
    },
  });

  return { message: text, type: "success" };
};

export { sendModelMessage };

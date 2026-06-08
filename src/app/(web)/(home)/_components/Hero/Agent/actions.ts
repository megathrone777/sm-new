"use server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

import { addToCart } from "@/app/(web)/_actions";
import { store } from "@/store";

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const sendMessage = async (message: string): Promise<string> => {
  const { text } = await generateText({
    messages: [
      { content: "Vždy odpovídej česky.", role: "system" },
      { content: message, role: "user" },
    ],
    model: anthropic("claude-haiku-4-5"),
  });

  return text;
};

const toCartProduct = (product: TProduct): TCartProduct => ({
  ...product,
  modifiers: [] as TCartModifier[],
  quantity: 1,
  totalPrice: product.price,
});

export const addTopSetsToCart = async (): Promise<string> => {
  const categories = await store.categories.getAll();
  const category = categories.find((c) => c.title.toLowerCase().includes("set"));

  if (!category) return "Kategorie setů nebyla nalezena.";

  const top2 = [...category.products]
    .filter((p) => p.isAvailable && !p.requiredModifier)
    .sort((a, b) => b.price - a.price)
    .slice(0, 2);

  if (top2.length === 0) return "Žádné dostupné sety.";

  for (const product of top2) {
    await addToCart(null, toCartProduct(product));
  }

  return "Top sety byly přidány do košíku!";
};

export const addTopRollsToCart = async (): Promise<string> => {
  const categories = await store.categories.getAll();
  const category = categories.find((c) => c.title.toLowerCase().includes("rol"));

  if (!category) return "Kategorie rolek nebyla nalezena.";

  const top2 = [...category.products]
    .filter((p) => p.isAvailable && !p.requiredModifier)
    .sort((a, b) => b.price - a.price)
    .slice(0, 2);

  if (top2.length === 0) return "Žádné dostupné rolky.";

  for (const product of top2) {
    await addToCart(null, toCartProduct(product));
  }

  return "Nejoblíbenější rolky byly přidány do košíku!";
};

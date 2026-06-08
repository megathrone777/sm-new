"use server";
import { addToCart } from "@/app/(web)/_actions";
import { store } from "@/store";

const addTopRollsToCart = async (): Promise<TActionResult> => {
  const categories = await store.categories.getAll();
  const category = categories.find(({ title }): boolean => title.toLowerCase().includes("rol"));

  if (!category) {
    return {
      message: "Kategorie rolek nebyla nalezena.",
      type: "error",
    };
  }

  const topRolls = [...category.products]
    .filter(({ isAvailable, requiredModifier }: TProduct) => isAvailable && !requiredModifier)
    .sort((productA: TProduct, productB: TProduct): number => productB.price - productA.price)
    .slice(0, 2);

  if (topRolls.length === 0) {
    return {
      message: "Žádné dostupné rolky.",
      type: "error",
    };
  }

  for (const topRoll of topRolls) {
    await addToCart(null, {
      ...topRoll,
      modifiers: [],
      quantity: 1,
      totalPrice: topRoll.price,
    });
  }

  return {
    message: "Nejoblíbenější rolky byly přidány do košíku!",
    type: "success",
  };
};

export { addTopRollsToCart };

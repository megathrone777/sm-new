"use server";
import { addToCart } from "@/app/(web)/_actions";
import { store } from "@/store";

const addTopSetsToCart = async (): Promise<TActionResult> => {
  const categories = await store.categories.getAll();
  const category = categories.find(({ title }): boolean => title.toLowerCase().includes("set"));

  if (!category) {
    return {
      message: "Kategorie setů nebyla nalezena.",
      type: "error",
    };
  }

  const topSets = [...category.products]
    .filter(
      ({ isAvailable, requiredModifier }: TProduct): boolean => isAvailable && !requiredModifier,
    )
    .sort((productA: TProduct, productB: TProduct) => productB.price - productA.price)
    .slice(0, 2);

  if (topSets.length === 0) {
    return {
      message: "Žádné dostupné sety.",
      type: "error",
    };
  }

  for (const topSet of topSets) {
    await addToCart(null, {
      ...topSet,
      modifiers: [],
      quantity: 1,
      totalPrice: topSet.price,
    });
  }

  return {
    message: "Top sety byly přidány do košíku!",
    type: "success",
  };
};

export { addTopSetsToCart };

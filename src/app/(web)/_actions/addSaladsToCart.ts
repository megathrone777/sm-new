"use server";
import { addToCart } from "@/app/(web)/_actions";
import { store } from "@/store";

const addSaladsToCart = async (): Promise<TActionResult> => {
  const categories = await store.categories.getAll();
  const category = categories.find(({ title }: TProductCategory): boolean =>
    title.toLowerCase().includes("sala"),
  );

  if (!category) {
    return {
      message: "Kategorie nebyla nalezena.",
      type: "error",
    };
  }

  const salads: TProduct[] = [...category.products]
    .filter(
      ({ isAvailable, requiredModifier }: TProduct): boolean => isAvailable && !requiredModifier,
    )
    .sort((productA: TProduct, productB: TProduct): number => productB.price - productA.price)
    .slice(0, 2);

  if (salads.length === 0) {
    return {
      message: "Žádné dostupné produkty.",
      type: "error",
    };
  }

  for (const salad of salads) {
    await addToCart(null, {
      ...salad,
      modifiers: [],
      quantity: 1,
      totalPrice: salad.price,
    });
  }

  return {
    message: "Vegetariánské produkty byly přidány do košíku!",
    type: "success",
  };
};

export { addSaladsToCart };

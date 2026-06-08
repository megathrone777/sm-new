"use server";
import { addToCart } from "@/app/(web)/_actions";
import { store } from "@/store";

const addSpicyToCart = async (): Promise<TActionResult> => {
  const products = await store.products.getAll();
  const spicyProducts: TProduct[] = products.filter(
    ({ composition, description }: TProduct): boolean =>
      Boolean(
        composition.toLowerCase().includes("chilli") ||
        description?.toLowerCase().includes("chilli"),
      ),
  );

  if (spicyProducts.length === 0) {
    return {
      message: "Žádné dostupné produkty.",
      type: "error",
    };
  }

  for (const spicyProduct of spicyProducts) {
    await addToCart(null, {
      ...spicyProduct,
      modifiers: [],
      quantity: 1,
      totalPrice: spicyProduct.price,
    });
  }

  return {
    message: "Pikantní produkty byly přidány do košíku!",
    type: "success",
  };
};

export { addSpicyToCart };

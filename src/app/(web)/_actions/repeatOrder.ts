"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";

import { saveCart } from "./saveCart";

const repeatOrder = async (orderId: number): Promise<TActionResult> => {
  const sessionId = await store.cart.getOrCreateSessionId();

  if (!sessionId) return { message: "Unauthorized", type: "error" };

  const [order, allProducts] = await Promise.all([
    store.orders.getById(orderId),
    store.products.getAllRaw(),
  ]);

  if (!order) return { message: "Objednávka nenalezena", type: "error" };
  if (!order.products.length) return { message: "Objednávka neobsahuje produkty", type: "error" };

  const unavailableOrders = order.products.filter(
    ({ slug }: TOrderProduct) => !allProducts?.[slug]?.isAvailable,
  );

  if (unavailableOrders.length > 0) {
    return {
      message: `Tyto produkty nejsou dostupné: ${unavailableOrders.map<string>(({ title }: TOrderProduct) => title).join(", ")}`,
      type: "error",
    };
  }

  const cartProducts: TCartProduct[] = order.products.map((p): TCartProduct => {
    const current = allProducts![p.slug]!;
    const modifierTotal = p.modifiers.reduce((sum, m) => sum + m.price, 0);

    return {
      ...current,
      modifiers: p.modifiers,
      quantity: p.quantity,
      totalPrice: p.quantity * (current.price + modifierTotal),
    };
  });

  await saveCart({
    additionals: [],
    note: "",
    products: cartProducts,
    promo: { code: "", discount: 0 },
  });

  revalidatePath("/", "layout");

  return { message: "Produkty přidány do košíku", type: "success" };
};

export { repeatOrder };

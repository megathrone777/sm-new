"use server";
import { revalidatePath } from "next/cache";

import { store } from "@/store";
import { isEqual } from "@/utils";

import { saveCart } from "./saveCart";
import { validateNewProduct } from "./validateNewProduct";

const initialCart: TCart = {
  additionals: [],
  categoryDiscount: 0,
  client: {
    email: "",
    name: "",
    phoneNumber: "",
  },
  cutlery: {
    quantity: 0,
    totalPrice: 0,
  },
  delivery: {
    address: "",
    conditions: [],
    distanceInM: 0,
    position: null,
    price: null,
    title: "",
    type: "delivery",
  },
  errors: {},
  note: "",
  payment: { change: null, type: "cash" },
  products: [],
  promo: {
    code: "",
    discount: 0,
  },
  time: { label: "Doručit teď", value: null },
  tips: { percentage: 0, price: 0 },
  totalPrice: 0,
};

const addToCart = async (
  _state: null | TActionResult,
  newProduct: TCartProduct,
): Promise<TActionResult> => {
  const validationResult = await validateNewProduct(newProduct);
  const sessionId = await store.cart.getOrCreateSessionId();

  if (!sessionId) {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const cart = await store.cart.get();

  if (validationResult.type === "success") {
    if (!cart) {
      await saveCart({ ...initialCart, products: [newProduct] });
    } else {
      const toComparable = ({
        modifiersTitle: _,
        quantity: __,
        totalPrice: ___,
        ...rest
      }: TCartProduct): Omit<TCartProduct, "modifiersTitle" | "quantity" | "totalPrice"> => rest;

      const foundIndex: number = cart.products.findIndex((product: TCartProduct): boolean =>
        isEqual(toComparable(newProduct), toComparable(product)),
      );
      const products = [...cart.products];
      const existing = products[foundIndex];

      if (existing) {
        products[foundIndex] = {
          ...existing,
          quantity: existing.quantity + 1,
          totalPrice: existing.totalPrice + newProduct.totalPrice,
        };
      } else {
        products.push(newProduct);
      }

      await saveCart({ products });
    }
    revalidatePath("/", "layout");
  }

  return validationResult;
};

export { addToCart };

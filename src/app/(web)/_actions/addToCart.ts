"use server";
import { revalidatePath } from "next/cache";

import { cartHelpers } from "@/helpers/cart";
import { cartStore } from "@/store";
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
    pickupLocation: {
      name: "Milíčova 471/25, Praha 3",
      position: [50.0861328, 14.4518119],
    },
    position: { lat: 0, lng: 0 },
    price: null,
    route: null,
    time: { label: "Doručit teď", value: null },
    title: "",
    // type: "delivery" TODO
    type: "pickup",
  },
  errors: {},
  note: "",
  payment: { change: null, type: "cash" },
  products: [],
  promo: {
    code: "",
    discount: 0,
  },
  tips: { percentage: 0, price: 0 },
  totalPrice: 0,
};

const addToCart = async (
  _state: null | TActionResult,
  newProduct: TCartProduct,
): Promise<TActionResult> => {
  const validationResult = await validateNewProduct(newProduct);
  const sessionId = await cartHelpers.getSessionIdAndCreateIfMissing();

  if (!sessionId) {
    return {
      message: "Unauthorized",
      type: "error",
    };
  }

  const cart = await cartStore.get(sessionId);

  if (validationResult.type === "success") {
    if (!cart) {
      await saveCart({ ...initialCart, products: [newProduct] });
    } else {
      const toComparable = ({
        quantity: _,
        totalPrice: __,
        ...rest
      }: TCartProduct): Omit<TCartProduct, "quantity" | "totalPrice"> => rest;

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

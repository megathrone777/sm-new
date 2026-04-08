"use server";
import { redirect } from "next/navigation";

import { cartHelpers } from "@/helpers";
import { isEqual } from "@/utils";

import { saveCart } from "./saveCart";
import { validateNewProduct } from "./validateNewProduct";

const initialCart: TCart = {
  additionals: [],
  clientInfo: {
    email: "",
    name: "",
    phone: "",
    phoneCountryCode: "CZ",
  },
  deliveryInfo: {
    address: "",
    clientPosition: { lat: 0, lng: 0 },
    conditions: [],
    distanceInM: 0,
    pickupLocation: {
      name: "Milíčova 471/25, Praha 3",
      position: [50.0861328, 14.4518119],
    },
    price: null,
    route: null,
    time: { label: "Doručit teď", value: null },
    type: "delivery",
  },
  errors: {
    address: null,
    deliveryTime: false,
    email: false,
    name: false,
    persons: false,
    phone: false,
    pickupAddress: false,
  },
  note: "",
  paymentInfo: { change: null, type: "cash" },
  persons: 0,
  products: [],
  promoCode: "",
  promoDiscount: 0,
  tipsInfo: { amount: 0, price: 0 },
  totalPrice: 0,
};

const addToCart = async (
  _state: null | TActionResult,
  newProduct: TCartProduct,
): Promise<TActionResult> => {
  const { addedFromList, modifiers, requiredModifier } = newProduct;

  if (addedFromList && requiredModifier && modifiers.length === 0) {
    redirect(`/product/${newProduct.slug}?requiredModifier=true`);
  }

  const cart = await cartHelpers.getCart();
  const newCart: TCart = cart ? { ...cart } : { ...initialCart };
  const validationResult = await validateNewProduct(newProduct);

  if (validationResult.type === "success") {
    const foundIndex: number = newCart.products.findIndex((product: TCartProduct): boolean =>
      isEqual(newProduct, product),
    );

    if (foundIndex !== -1 && newCart.products[foundIndex]) {
      newCart.products[foundIndex] = {
        ...newCart.products[foundIndex],
        quantity: newCart.products[foundIndex].quantity + 1,
        totalPrice: newCart.products[foundIndex].totalPrice + newProduct.totalPrice,
      };
    } else {
      newCart.products = [...newCart.products, newProduct];
    }

    await saveCart(newCart);

    return validationResult;
  }

  return validationResult;
};

export { addToCart };

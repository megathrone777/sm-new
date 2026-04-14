"use server";
import { cartHelpers } from "@/helpers/cart";
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
  cutleryCount: 0,
  cutleryPrice: 0,
  delivery: {
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
    title: "",
    // type: "delivery" TODO
    type: "pickup",
  },
  errors: [],
  note: "",
  payment: { change: null, type: "cash" },
  products: [],
  promoCode: "",
  promoDiscount: 0,
  tips: { amount: 0, price: 0 },
  totalPrice: 0,
};

const addToCart = async (
  _state: null | TActionResult,
  newProduct: TCartProduct,
): Promise<TActionResult> => {
  const validationResult = await validateNewProduct(newProduct);

  if (validationResult.type === "success") {
    const cart = await cartHelpers.getCart();
    const newCart: TCart = cart ? { ...cart } : { ...initialCart };

    const toComparable = ({
      quantity: _,
      totalPrice: __,
      ...rest
    }: TCartProduct): Omit<TCartProduct, "quantity" | "totalPrice"> => rest;

    const foundIndex: number = newCart.products.findIndex((product: TCartProduct): boolean =>
      isEqual(toComparable(newProduct), toComparable(product)),
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
  }

  return validationResult;
};

export { addToCart };

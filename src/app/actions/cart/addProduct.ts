"use server";
import { getCart } from "@/helpers";
import { isEqual } from "@/utils";

import { saveCart } from "./saveCart";

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

const addProduct = async (newProduct: TCartProduct): Promise<void> => {
  const cart = await getCart();
  const newCart: TCart = cart ? { ...cart } : { ...initialCart };
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
};

export { addProduct };

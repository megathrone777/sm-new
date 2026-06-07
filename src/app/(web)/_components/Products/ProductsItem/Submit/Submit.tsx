"use client";
import React, { startTransition } from "react";
import Form from "next/form";

import { addToCart, validateNewProduct } from "@/app/(web)/_actions";
import {
  dispatchShopClosed,
  SHOP_CLOSED_MESSAGE,
} from "@/app/(web)/_components/Controls/shopClosed";
import { Icon } from "@/ui";

import { buttonClass, iconClass } from "./Submit.css";

import type { TProps } from "./Submit.types";

const Submit: React.FC<TProps> = (product) => {
  const formAction = (): void => {
    const newProduct: TCartProduct = {
      ...product,
      modifiers: [],
      quantity: 1,
      totalPrice: product.price,
    };

    startTransition(async () => {
      const { message, type } = await validateNewProduct(newProduct);

      if (message === SHOP_CLOSED_MESSAGE) {
        dispatchShopClosed();

        return;
      }

      const { toast } = await import("react-toastify");

      toast(message, { type });

      if (type === "success") {
        void addToCart(null, newProduct);
      }
    });
  };

  return (
    <Form action={formAction}>
      <button
        aria-label="Add to cart"
        className={buttonClass}
        type="submit"
      >
        <Icon
          className={iconClass}
          id="buy"
        />
      </button>
    </Form>
  );
};

export { Submit };

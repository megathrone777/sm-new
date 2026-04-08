"use client";
import React, { startTransition } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import { addToCart, validateNewProduct } from "@/app/(web)/_actions";
import { Icon } from "@/ui";

import { buttonClass, iconClass } from "./Submit.css";

import type { TProps } from "./Submit.types";

const Submit: React.FC<TProps> = (product) => {
  const formAction = (): void => {
    const newProduct: TCartProduct = {
      ...product,
      addedFromList: true,
      modifiers: [],
      quantity: 1,
      totalPrice: product.price,
    };

    startTransition(async () => {
      const { message, type } = await validateNewProduct(newProduct);

      toast(message, { type });

      if (type === "success") {
        addToCart(null, newProduct);
      }
    });
  };

  return (
    <Form action={formAction}>
      <button
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

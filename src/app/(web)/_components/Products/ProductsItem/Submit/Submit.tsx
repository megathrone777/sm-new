"use client";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import { addToCart } from "@/app/(web)/_actions";
import { Icon, Spinner } from "@/ui";

import { buttonClass, iconClass } from "./Submit.css";

import type { TProps } from "./Submit.types";

const Submit: React.FC<TProps> = (product) => {
  const [state, action, pending] = useActionState(addToCart, null);

  const formAction = (): void => {
    action({
      ...product,
      addedFromList: true,
      modifiers: [],
      quantity: 1,
      totalPrice: product.price,
    });
  };

  useEffect((): void => {
    if (!state) return;
    const { message, type } = state;

    toast(message, { type });
  }, [state]);

  return (
    <Form action={formAction}>
      <button
        className={buttonClass}
        disabled={pending}
        type="submit"
      >
        {pending ? (
          <Spinner
            color="white"
            template="small"
          />
        ) : (
          <Icon
            className={iconClass}
            id="buy"
          />
        )}
      </button>
    </Form>
  );
};

export { Submit };

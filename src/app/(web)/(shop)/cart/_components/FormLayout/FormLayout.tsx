"use client";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import {
  saveCartFields,
  updateDeliveryType,
  updatePaymentType,
  validateAndSubmitCart,
} from "@/app/(web)/_actions";

import { wrapperClass } from "./FormLayout.css";

import type { TProps } from "./FormLayout.types";

const FormLayout: React.FC<TProps> = ({ children, errors }) => {
  const [, action] = useActionState(validateAndSubmitCart, null);

  const handleFormBlur = ({ currentTarget }: React.FocusEvent<HTMLFormElement>): void => {
    saveCartFields(new FormData(currentTarget));
  };

  const handleFormChange = ({
    currentTarget,
    target,
  }: React.SyntheticEvent<HTMLFormElement>): void => {
    const input = target as HTMLInputElement;

    if (input.name === "deliveryType") {
      updateDeliveryType(new FormData(currentTarget));

      return;
    }

    if (input.name === "payment") {
      updatePaymentType(new FormData(currentTarget));
    }
  };

  const handleFormKeyDown = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    const target = event.target as HTMLElement;

    if (event.key === "Enter" && target.tagName === "INPUT") {
      event.preventDefault();
    }
  };

  useEffect((): void => {
    if (!Object.keys(errors).length) return;

    for (const key in errors) {
      const message = errors[key as keyof typeof errors];

      if (message) {
        toast(message, { type: "error" });
      }
    }

    const errorsAnchor = document.getElementById("cart-cutlery");

    if (errorsAnchor) {
      errorsAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <Form
      {...{ action }}
      autoComplete="off"
      className={wrapperClass}
      onBlur={handleFormBlur}
      onChange={handleFormChange}
      onKeyDown={handleFormKeyDown}
    >
      {children}
    </Form>
  );
};

export { FormLayout };

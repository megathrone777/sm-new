"use client";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import { saveCartFields, validateAndSubmitCart } from "@/app/(web)/_actions";

import { wrapperClass } from "./FormLayout.css";

import type { TProps } from "./FormLayout.types";

const FormLayout: React.FC<TProps> = ({ children, errors }) => {
  const [, action] = useActionState(validateAndSubmitCart, null);

  const handleBlur = ({ currentTarget }: React.FocusEvent<HTMLFormElement>): void => {
    saveCartFields(new FormData(currentTarget));
  };

  useEffect((): void => {
    if (!Object.keys(errors).length) return;

    for (const key in errors) {
      const message = errors[key as keyof typeof errors];

      if (message) toast(message, { type: "error" });
    }

    document.getElementById("cart-cutlery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Form
      {...{ action }}
      autoComplete="off"
      className={wrapperClass}
      onBlur={handleBlur}
    >
      {children}
    </Form>
  );
};

export { FormLayout };

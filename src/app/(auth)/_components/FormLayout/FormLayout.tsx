"use client";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import { Button } from "@/ui";

import { wrapperClass, footerClass } from "./FormLayout.css";

import type { TProps } from "./FormLayout.types";

const FormLayout: React.FC<TProps> = ({ children, className, formAction }) => {
  const [state, action, pending] = useActionState(formAction, null);

  useEffect((): void => {
    if (!state) return;
    const { message, type } = state;

    toast(message, { type });
  }, [state]);

  return (
    <Form
      {...{ action }}
      className={`${wrapperClass}${className ? ` ${className}` : ""}`}
    >
      {children}

      <div className={footerClass}>
        <Button
          disabled={pending}
          iconId="save"
          template="small"
          type="submit"
        />
      </div>
    </Form>
  );
};

export { FormLayout };

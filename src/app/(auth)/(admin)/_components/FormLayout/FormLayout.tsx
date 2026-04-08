"use client";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import { Button } from "@/ui";

import { contentClass, footerClass, wrapperClass } from "./FormLayout.css";

import type { TProps } from "./FormLayout.types";

const FormLayout: React.FC<TProps> = ({ children, className, formAction, layoutClassName }) => {
  const [state, action, pending] = useActionState(formAction, null);
  const [submitKey, setSubmitKey] = useState(0);

  useEffect((): void => {
    if (!state) return;
    const { message, type } = state;

    if (type === "success") {
      (document.activeElement as HTMLElement)?.blur();
      setSubmitKey((prevKey: number): number => prevKey + 1);
    }

    toast(message, { type });
  }, [state]);

  return (
    <Form
      {...{ action }}
      autoComplete="off"
      className={`${wrapperClass}${className ? ` ${className}` : ""}`}
    >
      <div
        className={`${contentClass}${layoutClassName ? ` ${layoutClassName}` : ""}`}
        key={submitKey}
      >
        {children}
      </div>

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

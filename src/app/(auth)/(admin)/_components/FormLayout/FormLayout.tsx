"use client";
import React, { useActionState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import { Button } from "@/ui";

import { contentClass, footerClass, wrapperClass } from "./FormLayout.css";

import type { TProps } from "./FormLayout.types";

const FormLayout: React.FC<TProps> = ({
  children,
  className,
  formAction,
  layoutClassName,
  resetOnSuccess = true,
}) => {
  const [state, action, pending] = useActionState(formAction, null);
  const prevStateRef = useRef<TActionResult>(state);
  const submitKeyRef = useRef<number>(0);

  if (state !== prevStateRef.current) {
    if (state?.type === "success" && resetOnSuccess) {
      submitKeyRef.current += 1;
    }

    prevStateRef.current = state;
  }

  useEffect((): void => {
    if (!state) return;
    const { message, type } = state;

    if (type === "success") {
      (document.activeElement as HTMLElement)?.blur();
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
        key={submitKeyRef.current}
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

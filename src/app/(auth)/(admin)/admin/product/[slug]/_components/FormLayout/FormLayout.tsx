"use client";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

import { updateProduct } from "@/app/(auth)/(admin)/_actions";
import { Button } from "@/ui";

import { footerClass } from "./FormLayout.css";

const FormLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, formAction, pending] = useActionState(updateProduct, null);

  useEffect((): void => {
    if (!state) return;
    const { message, type } = state;

    toast(message, { type });
  }, [state]);

  return (
    <form action={formAction}>
      {children}

      <div className={footerClass}>
        <Button
          disabled={pending}
          template="small"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export { FormLayout };

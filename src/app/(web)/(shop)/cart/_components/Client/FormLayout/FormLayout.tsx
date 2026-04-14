"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { updateClient } from "@/app/(web)/_actions";
import { useDebouncedCallback } from "@/hooks";

import type { TProps } from "./FormLayout.types";

const FormLayout: React.FC<TProps> = ({ children, errors }) => {
  const debouncedUpdate = useDebouncedCallback(
    async (name: string, email: string): Promise<void> => {
      const formData = new FormData();

      formData.set("name", name);
      formData.set("email", email);
      updateClient(formData);
    },
  );

  const handleChange = ({ currentTarget }: React.ChangeEvent<HTMLFormElement>): void => {
    const formData = new FormData(currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");

    debouncedUpdate(name, email);
  };

  useEffect((): void => {
    if (errors && !!Object.keys(errors).length) {
      for (const error in errors) {
        toast(errors[error as keyof typeof errors], {
          type: "error",
        });
      }
    }
  }, []);

  return (
    <form
      action="#"
      onChange={handleChange}
      onSubmit={(event) => event.preventDefault()}
    >
      {children}
    </form>
  );
};

export { FormLayout };

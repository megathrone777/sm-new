"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Form from "next/form";

import { updateClient } from "@/app/(web)/_actions";
import { useDebouncedCallback } from "@/hooks";

import { wrapperClass } from "./FormLayout.css";

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

  const handleChange = ({ currentTarget }: React.SyntheticEvent<HTMLFormElement>): void => {
    const formData = new FormData(currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");

    debouncedUpdate(name, email);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
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
    <Form
      action="#"
      className={wrapperClass}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      {children}
    </Form>
  );
};

export { FormLayout };

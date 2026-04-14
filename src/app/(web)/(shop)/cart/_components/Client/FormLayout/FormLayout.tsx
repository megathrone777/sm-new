"use client";
import React from "react";
import Form from "next/form";

import { updateClient } from "@/app/(web)/_actions";
import { useDebouncedCallback } from "@/hooks";

import type { TProps } from "./FormLayout.types";

const FormLayout: React.FC<TProps> = ({ children }) => {
  const debouncedChange = useDebouncedCallback(
    ({ currentTarget }: React.SubmitEvent<HTMLFormElement>) => {
      currentTarget.submit();
    },
    300,
  );

  return (
    <Form
      action={updateClient}
      onChange={debouncedChange}
    >
      {children}
    </Form>
  );
};

export { FormLayout };

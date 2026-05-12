"use client";
import React from "react";
import { useFormStatus } from "react-dom";

import { useTranslation } from "@/hooks";
import { Button } from "@/ui";

import { priceClass, wrapperClass } from "./Submit.css";

import type { TProps } from "./Submit.types";

const Submit: React.FC<TProps> = ({ totalPrice }) => {
  const { pending } = useFormStatus();
  const { t } = useTranslation();

  return (
    <div className={wrapperClass}>
      <p className={priceClass}>
        {t<string>("priceTotal")}: {totalPrice} {t<string>("currency")}
      </p>

      <Button
        disabled={pending}
        type="submit"
      >
        {t<string>("goToPay")}
      </Button>
    </div>
  );
};

export { Submit };

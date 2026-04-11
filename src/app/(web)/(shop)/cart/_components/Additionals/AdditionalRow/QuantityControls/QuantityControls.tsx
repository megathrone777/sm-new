"use client";
import React from "react";

import { QuantityButton } from "@/ui";

import { quantityClass, wrapperClass } from "./QuantityControls.css";

import type { TProps } from "./QuantityControls.types";

const QuantityControls: React.FC<TProps> = ({ onUpdate, quantity }) => {
  const handleQuantityClick = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const type = currentTarget.value as "decrease" | "increase";

    onUpdate(type);
  };

  return (
    <div className={wrapperClass}>
      <QuantityButton
        decrease
        onClick={handleQuantityClick}
        type="button"
        value="decrease"
      />

      <p className={quantityClass}>{quantity}</p>

      <QuantityButton
        onClick={handleQuantityClick}
        type="button"
        value="increase"
      />
    </div>
  );
};

export { QuantityControls };

"use client";
import React, { useOptimistic, startTransition } from "react";

import { updateQuantity } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { QuantityButton } from "@/ui";

import {
  optionsClass,
  priceClass,
  quantityAmountClass,
  quantityClass,
  removeButtonClass,
} from "./QuantityControls.css";

import type { TProps } from "./QuantityControls.types";

const QuantityControls: React.FC<TProps> = ({ index, onRemove, quantity, totalPrice }) => {
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic<number>(quantity);
  const { t } = useTranslation();

  const handleQuantityClick = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const type = currentTarget.value as "decrease" | "increase";

    startTransition(async (): Promise<void> => {
      if (type === "decrease") {
        setOptimisticQuantity((quantity: number): number => Math.max(0, quantity - 1));
      }

      if (type === "increase") {
        setOptimisticQuantity((quantity: number) => quantity + 1);
      }

      await updateQuantity(index, type);
    });
  };

  return (
    <>
      <div className={quantityClass}>
        <QuantityButton
          decrease
          onClick={handleQuantityClick}
          type="button"
          value="decrease"
        />

        <p className={quantityAmountClass}>{optimisticQuantity}</p>

        <QuantityButton
          onClick={handleQuantityClick}
          type="button"
          value="increase"
        />
      </div>

      <div className={optionsClass}>
        <p className={priceClass}>
          {totalPrice} {t<string>("currency")}
        </p>

        <button
          className={removeButtonClass}
          onClick={onRemove}
          type="button"
        >
          {t<string>("remove")}
        </button>
      </div>
    </>
  );
};

export { QuantityControls };

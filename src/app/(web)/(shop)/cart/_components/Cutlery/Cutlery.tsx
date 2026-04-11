"use client";
import React, { startTransition, useOptimistic } from "react";

import { updateCutleryQuantity } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { QuantityButton } from "@/ui";

import {
  nameClass,
  priceClass,
  quantityAmountClass,
  quantityClass,
  wrapperClass,
  layoutClass,
} from "./Cutlery.css";

import type { TProps } from "./Cutlery.types";

const Cutlery: React.FC<TProps> = ({ cutleryCount, cutleryPrice }) => {
  const { t } = useTranslation();

  const [optimisticCount, optimisticUpdate] = useOptimistic(
    cutleryCount,
    (state: number, type: "decrease" | "increase"): number =>
      type === "increase" ? state + 1 : Math.max(0, state - 1),
  );

  const handleQuantityClick = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const type = currentTarget.value as "decrease" | "increase";

    startTransition(async (): Promise<void> => {
      optimisticUpdate(type);
      await updateCutleryQuantity(type);
    });
  };

  return (
    <div
      className={wrapperClass}
      id="cart-cutlery"
    >
      <p>{t<string>("cutleryDescription")}</p>

      <div className={layoutClass}>
        <div>
          <p className={nameClass.default}>Příbory</p>
        </div>

        <div className={quantityClass}>
          <QuantityButton
            decrease
            onClick={handleQuantityClick}
            type="button"
            value="decrease"
          />

          <p className={quantityAmountClass}>{optimisticCount}</p>

          <QuantityButton
            onClick={handleQuantityClick}
            type="button"
            value="increase"
          />

          <p className={priceClass}>
            {cutleryPrice > 0 ? `${cutleryPrice} ${t<string>("currency")}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Cutlery };

"use client";
import React, { startTransition, useEffect, useOptimistic } from "react";
import { useRouter } from "next/navigation";

import { updateCutleryQuantity } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { Icon, QuantityButton } from "@/ui";

import {
  errorIconClass,
  nameClass,
  priceClass,
  quantityAmountClass,
  quantityClass,
  wrapperClass,
  layoutClass,
} from "./Cutlery.css";

import type { TProps } from "./Cutlery.types";

const Cutlery: React.FC<TProps> = ({ isError, quantity: initialQuantity, totalPrice }) => {
  const [quantity, setQuantity] = useOptimistic(
    initialQuantity,
    (state: number, type: "decrease" | "increase"): number =>
      type === "increase" ? state + 1 : Math.max(0, state - 1),
  );
  const router = useRouter();
  const { t } = useTranslation();

  const handleQuantityClick = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const type = currentTarget.value as "decrease" | "increase";

    startTransition(async (): Promise<void> => {
      setQuantity(type);
      await updateCutleryQuantity(type);
    });
  };

  useEffect((): VoidFunction => {
    const scrollEnd = (): void => {
      if (window.location.hash.includes("cart-cutlery")) {
        router.replace("/cart", { scroll: false });
      }
    };

    window.addEventListener("scrollend", scrollEnd);

    return (): void => window.removeEventListener("scrollend", scrollEnd);
  }, []);

  return (
    <div className={wrapperClass}>
      <p>{t<string>("cutleryDescription")}</p>

      <div className={layoutClass[isError ? "error" : "default"]}>
        <p className={nameClass}>
          {isError && (
            <Icon
              className={errorIconClass}
              id="exclamation"
            />
          )}

          <span>Příbory</span>
        </p>

        <div className={quantityClass}>
          <QuantityButton
            decrease
            disabled={quantity === 0}
            onClick={handleQuantityClick}
            type="button"
            value="decrease"
          />

          <p className={quantityAmountClass}>{quantity}</p>

          <QuantityButton
            onClick={handleQuantityClick}
            type="button"
            value="increase"
          />
        </div>

        <p className={priceClass}>
          {totalPrice > 0 ? `${totalPrice} ${t<string>("currency")}` : ""}
        </p>
      </div>
    </div>
  );
};

export { Cutlery };

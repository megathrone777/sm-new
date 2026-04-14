"use client";
import React from "react";

import { useTranslation } from "@/hooks";
import { Checkbox } from "@/ui";

import { labelClass, wrapperClass } from "./DeliveryType.css";

import type { TProps } from "./DeliveryType.types";

const DeliveryType: React.FC<TProps> = ({ totalPrice, type }) => {
  const { t } = useTranslation();

  const checkPickupDiscount = (): number => {
    if (totalPrice > 500) {
      return 50;
    }

    return 0;
  };

  const handleDeliveryToggle = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const type = currentTarget.value as TDeliveryType;

    console.log(type);
  };

  return (
    <div className={wrapperClass}>
      <Checkbox
        checked={type === "delivery"}
        label={t<string>("deliveryLabel")}
        labelClassName={labelClass}
        onChange={handleDeliveryToggle}
        type="radio"
        value="delivery"
      />

      <Checkbox
        checked={type === "pickup"}
        hint={checkPickupDiscount() > 0 ? "-50 Kč" : undefined}
        label={t<string>("pickupLabel")}
        labelClassName={labelClass}
        onChange={handleDeliveryToggle}
        type="radio"
        value="pickup"
      />
    </div>
  );
};

export { DeliveryType };

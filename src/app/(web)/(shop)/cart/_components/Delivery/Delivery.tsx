import React from "react";

import { useTranslation } from "@/hooks";
import { Checkbox } from "@/ui";

import { wrapperClass } from "./Delivery.css";

import type { TProps } from "./Delivery.types";

const Delivery: React.FC<TProps> = ({ totalPrice, type }) => {
  const { t } = useTranslation();

  const checkPickupDiscount = (): number => {
    if (totalPrice > 500) {
      return 50;
    }

    return 0;
  };

  return (
    <div className={wrapperClass}>
      <Checkbox
        defaultChecked={type === "delivery"}
        label={t<string>("deliveryLabel")}
        // labelClassName={labelClass}
        name="deliveryType"
        type="radio"
        value="delivery"
      />

      <Checkbox
        defaultChecked={type === "pickup"}
        hint={checkPickupDiscount() > 0 ? `-50 ${t<string>("currency")}` : ""}
        label={t<string>("pickupLabel")}
        // labelClassName={labelClass}
        name="deliveryType"
        type="radio"
        value="pickup"
      />
    </div>
  );
};

export { Delivery };

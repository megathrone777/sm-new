import React from "react";

import { itemClass, labelClass, valueClass } from "../Item.css";
import { typeClass } from "./Payment.css";

import type { TProps } from "./Payment.types";

const Payment: React.FC<TProps> = ({
  paymentType,
  promocode,
  promocodeDiscountPrice,
  totalPrice,
}) => {
  const getPaymentText = (): string => {
    if (paymentType === "card") return "Картой онлайн";
    if (paymentType === "cash") return "Наличными";

    return "Картой на месте";
  };

  return (
    <>
      <p className={itemClass}>
        <span className={valueClass}>
          <span className={`${typeClass} ${paymentType}`}>{getPaymentText()}</span> - {totalPrice}Kč
        </span>
      </p>

      {promocode.length > 0 && (
        <p className={itemClass}>
          <span className={labelClass}>Скидка:</span>

          <span className={`${valueClass} normal`}>
            {promocode} ({promocodeDiscountPrice}Kč)
          </span>
        </p>
      )}
    </>
  );
};

export { Payment };

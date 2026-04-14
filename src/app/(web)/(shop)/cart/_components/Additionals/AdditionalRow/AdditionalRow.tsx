import React from "react";

import { useTranslation } from "@/hooks";

import { QuantityControls } from "./QuantityControls";

import { wrapperClass, nameClass, priceClass } from "./AdditionalRow.css";

import type { TProps } from "./AdditionalRow.types";

const AdditionalRow: React.FC<TProps> = ({ onUpdate, price, quantity, title }) => {
  const { t } = useTranslation();

  return (
    <div className={wrapperClass}>
      <p className={nameClass}>{title}</p>
      <QuantityControls {...{ onUpdate, quantity }} />

      <p className={priceClass}>
        {price * quantity} {t<string>("currency")}
      </p>
    </div>
  );
};

export { AdditionalRow };

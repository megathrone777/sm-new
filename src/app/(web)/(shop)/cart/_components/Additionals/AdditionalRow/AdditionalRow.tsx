import React from "react";

import { useTranslation } from "@/hooks";

import { QuantityControls } from "./QuantityControls";

import { wrapperClass, nameClass, priceClass } from "./AdditionalRow.css";

import type { TProps } from "./AdditionalRow.types";

const AdditionalRow: React.FC<TProps> = ({ onUpdate, price, quantity, title }) => {
  const { t } = useTranslation();

  return (
    <div className={wrapperClass}>
      <div>
        <p className={nameClass}>{title}</p>
      </div>

      <QuantityControls {...{ onUpdate, quantity }} />

      <div>
        <p className={priceClass}>
          {price} {t<string>("currency")}
        </p>
      </div>
    </div>
  );
};

export { AdditionalRow };

import React from "react";

import { applyPromocode, resetPromocode } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { Icon, Input } from "@/ui";

import {
  buttonClass,
  layoutClass,
  resetButtonClass,
  submitClass,
  successIconClass,
} from "./Promo.css";

import type { TProps } from "./Promo.types";

const Promo: React.FC<TProps> = ({
  addressError,
  delivery,
  phoneError,
  phoneNumber,
  promo,
  promoError,
}) => {
  const { t } = useTranslation();

  const isDisabled =
    (delivery.type === "delivery" && delivery.address.length === 0) ||
    Boolean(addressError) ||
    phoneNumber.length === 0 ||
    Boolean(phoneError);
  const isApplied = promo.discount > 0;

  return (
    <fieldset
      className={layoutClass}
      disabled={isDisabled}
      id="promo"
    >
      <Input
        autoComplete="off"
        defaultValue={promo.code}
        iconId="promo"
        isError={Boolean(promoError)}
        key={`promo-${promo.code}`}
        name="promo"
        placeholder={t<string>("promoTitle")}
        type="text"
      />

      {promo.code.length > 0 && (
        <button
          className={resetButtonClass}
          formAction={resetPromocode}
          type="submit"
        >
          <Icon id="cross" />
        </button>
      )}

      <div className={submitClass}>
        {isApplied ? (
          <Icon
            className={successIconClass}
            id="checkmark"
          />
        ) : (
          <button
            className={buttonClass}
            formAction={applyPromocode}
            type="submit"
          >
            {t<string>("promoUse")}
          </button>
        )}
      </div>

      {promoError && <p>{promoError}</p>}
    </fieldset>
  );
};

export { Promo };

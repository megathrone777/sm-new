import React from "react";

import { resetPromocode } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { Icon, Input } from "@/ui";

import {
  buttonClass,
  layoutClass,
  resetButtonClass,
  submitClass,
  successLayoutClass,
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
        enterKeyHint="done"
        form="promo-form"
        iconId="promo"
        isError={Boolean(promoError)}
        key={`promo-${promo.code}`}
        name="promo"
        placeholder={t<string>("promoTitle")}
        restrictCyrillic
        type="text"
      />

      {promo.code.length > 0 && (
        <button
          className={resetButtonClass}
          form="promo-form"
          formAction={resetPromocode}
          type="submit"
        >
          <Icon id="close" />
        </button>
      )}

      <div className={submitClass}>
        {isApplied ? (
          <div className={successLayoutClass}>
            <Icon id="checkmark" />
          </div>
        ) : (
          <button
            className={buttonClass}
            form="promo-form"
            type="submit"
          >
            {t<string>("promoUse")}
          </button>
        )}
      </div>
    </fieldset>
  );
};

export { Promo };

"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AsYouType, getCountryCallingCode, getExampleNumber } from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";
import { useTelephone, type CountryCode } from "use-telephone";

import { setCartError, updatePhone } from "@/app/(web)/_actions";
import { Icon } from "@/ui";

import { Popup } from "./Popup";

import {
  errorIconClass,
  inputClass,
  inputWrapperClass,
  placeholderClass,
  wrapperClass,
} from "./Phone.css";

import type { TProps } from "./Phone.types";

const getPlaceholderSplit = (value: string, placeholder: string): number => {
  const typedDigits = value.replace(/\D/g, "").length;
  let counted = 0;

  for (let i = 0; i < placeholder.length; i++) {
    if (/\d/.test(placeholder[i] ?? "") && ++counted === typedDigits) return i + 1;
  }

  return placeholder.length;
};

const getFormatPlaceholder = (country: CountryCode): string => {
  const example = getExampleNumber(country, examples);
  const prefix = `+${getCountryCallingCode(country)}`;

  if (!example) return prefix;

  return prefix + example.formatInternational().slice(prefix.length).replace(/\d/g, "0");
};

const Phone: React.FC<TProps> = ({ isError, phoneNumber }) => {
  const [countrySelected, setCountrySelected] = useState(false);
  const [partialCountry, setPartialCountry] = useState<CountryCode | undefined>();
  const [touched, setTouched] = useState<boolean>(false);
  const telephone = useTelephone({
    initialValue: phoneNumber ? `+${phoneNumber}` : "+420",
  });
  const showError = Boolean(isError) || (touched && !telephone.valid);
  const effectiveCountry: CountryCode =
    partialCountry ?? (!countrySelected && telephone.country === "AF" ? "CZ" : telephone.country);

  const handleBlur = (): void => {
    setTouched(true);
    setCartError("phone", telephone.valid ? "" : "Neplatné telefonní číslo");
  };

  const handleCountryChange = (countryCode: CountryCode): void => {
    setCountrySelected(true);
    setPartialCountry(undefined);
    telephone.onChangeCountry(countryCode);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { currentTarget } = event;

    if (!currentTarget.value.startsWith("+")) {
      currentTarget.value = "+" + currentTarget.value;
    }

    telephone.onChange(event);

    const asYouType = new AsYouType();

    asYouType.input(currentTarget.value);
    setPartialCountry(asYouType.getCountry() as CountryCode | undefined);
  };

  const placeholder = getFormatPlaceholder(effectiveCountry);

  useEffect((): void => {
    if (!telephone.valid || !telephone.parsed) return;
    const { number } = telephone.parsed;

    updatePhone(number);
  }, [telephone.valid]);

  useLayoutEffect((): void => {
    if (!phoneNumber) {
      telephone.onChangeCountry("CZ");
    }
  }, []);

  return (
    <div
      className={wrapperClass}
      style={{ gridTemplateColumns: showError ? "auto 1fr auto" : "auto 1fr" }}
    >
      <Popup
        countryCode={telephone.country}
        onCountryChange={handleCountryChange}
      />

      <div className={inputWrapperClass}>
        <input
          autoComplete="new-password"
          className={inputClass[showError ? "error" : "default"]}
          enterKeyHint="done"
          maxLength={placeholder.length}
          name="phone"
          onBlur={handleBlur}
          onChange={handlePhoneChange}
          spellCheck="false"
          type="tel"
          value={telephone.value}
        />

        <p className={placeholderClass}>
          <span style={{ color: "transparent" }}>
            {placeholder.slice(0, getPlaceholderSplit(telephone.value, placeholder))}
          </span>

          {placeholder.slice(getPlaceholderSplit(telephone.value, placeholder))}
        </p>
      </div>

      {showError && (
        <Icon
          className={errorIconClass}
          id="exclamation"
        />
      )}
    </div>
  );
};

export { Phone };

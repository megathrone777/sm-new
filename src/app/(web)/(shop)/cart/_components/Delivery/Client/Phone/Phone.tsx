"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { countries, useTelephone, type CountryCode } from "use-telephone";

import { Selectbox } from "@/ui";

import { Option, type TOption } from "./Option";

import { inputClass, inputWrapperClass } from "./Phone.css";

import type { TProps } from "./Phone.types";

const Phone: React.FC<TProps> = ({ phoneNumber }) => {
  const telephone = useTelephone({
    initialValue: `+${phoneNumber}`,
    // +420 is default
  });

  console.log(telephone.country);

  const getOptions = (): TOption[] =>
    countries.map(
      ({ code, name }): TOption => ({
        label: name,
        value: code,
      }),
    );

  const handleCountryChange = (value: CountryCode): void => {
    telephone.onChangeCountry(value);
  };

  const handleInputErrorReset = (): void => {
    // dispatch(
    //   setCartErrors({
    //     phone: false,
    //   }),
    // );
  };

  useEffect((): void => {
    if (telephone.parsed) {
      // const { country, nationalNumber } = telephone.parsed;
      // dispatch(
      //   setDeliveryInfo({
      //     phone: nationalNumber,
      //     phoneCountryCode: country,
      //   }),
      // );
    }
  }, [telephone.parsed]);

  useLayoutEffect((): void => {
    if (telephone.country === "AF") {
      telephone.onChangeCountry("CZ");
    }
  }, []);

  return (
    <div style={{ display: "grid", gridAutoFlow: "column" }}>
      <div className={inputWrapperClass}>
        <div style={{ position: "relative" }}>
          <img
            alt="Country flag."
            src={telephone.flag}
            style={{
              display: "block",
              width: 24,
            }}
          />

          <Selectbox
            id="phone-select"
            onChange={handleCountryChange}
            optionRender={({ label, value }): React.ReactElement => (
              <Option
                {...{ label }}
                value={value as CountryCode}
              />
            )}
            options={getOptions()}
            style={{ left: 0, opacity: 0, position: "absolute", top: -6, width: 240 }}
          />
        </div>

        <input
          // hasError={errors.phone}
          className={inputClass["default"]}
          maxLength={telephone.country === "CZ" ? 16 : 100}
          name="phone"
          onChange={telephone.onChange}
          onFocus={handleInputErrorReset}
          type="tel"
          value={telephone.value}
        />
      </div>
    </div>
  );
};

export { Phone };

"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Select from "@rc-component/select";
import { getExampleNumber, type Examples } from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";
import { countries, useTelephone, type CountryCode } from "use-telephone";

import { setCartError, updatePhone } from "@/app/(web)/_actions";
import { Icon } from "@/ui";

import { Popup } from "./Popup";
import { labelRender, optionRender } from "./templates";

import {
  errorIconClass,
  inputClass,
  inputWrapperClass,
  layoutClass,
  popupClass,
} from "./Phone.css";

import type { TOptionData } from "./Option";
import type { TProps } from "./Phone.types";

const Phone: React.FC<TProps> = ({ isError, phoneNumber }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [countrySelected, setCountrySelected] = useState(false);
  const [touched, setTouched] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const telephone = useTelephone({
    initialValue: phoneNumber ? `+${phoneNumber}` : "+420",
  });
  const showError = Boolean(isError) || (touched && !telephone.valid);
  const selectedCountry: CountryCode =
    !countrySelected && telephone.country === "AF" ? "CZ" : telephone.country;
  const exampleNumber = getExampleNumber(selectedCountry, examples as Examples);
  const phonePlaceholder = exampleNumber?.formatInternational() ?? "Vyplňte telefonní číslo";

  const handleBlur = (): void => {
    setTouched(true);
    setCartError("phone", telephone.valid ? "" : "Neplatné telefonní číslo");
  };

  const filteredOptions = countries
    .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    .map<TOptionData>(({ code, name }) => ({ label: name, value: code }));

  const handleCountryChange = (value: CountryCode): void => {
    setCountrySelected(true);
    telephone.onChangeCountry(value);
  };

  const handleMouseDown = (
    event: React.SyntheticEvent<HTMLButtonElement | HTMLInputElement>,
  ): void => {
    event.stopPropagation();
  };

  const handleDropdownVisibleChange = (isOpened: boolean): void => {
    if (!isOpened) {
      setSearchValue("");
    }
  };

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setSearchValue(currentTarget.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { currentTarget } = event;

    if (!currentTarget.value.startsWith("+")) {
      currentTarget.value = "+" + currentTarget.value;
    }

    telephone.onChange(event);
  };

  const popupRender = (menu: React.ReactNode): React.ReactElement => (
    <Popup
      {...{ searchRef, searchValue }}
      onInputChange={handleInputChange}
      onMouseDown={handleMouseDown}
    >
      {menu}
    </Popup>
  );

  useEffect((): void => {
    if (!telephone.valid || !telephone.parsed) return;
    const { number } = telephone.parsed;

    updatePhone(number);
  }, [telephone.valid]);

  useLayoutEffect((): void => {
    if (!phoneNumber || telephone.country === "AF") {
      telephone.onChangeCountry("CZ");
    }
  }, []);

  return (
    <div
      className={inputWrapperClass}
      style={{ gridTemplateColumns: showError ? "auto 1fr auto" : "auto 1fr" }}
    >
      <Select<CountryCode, TOptionData>
        {...{ labelRender, optionRender, popupRender }}
        className={layoutClass}
        id="phone-select"
        menuItemSelectedIcon={null}
        notFoundContent="Nenalezeno"
        onChange={handleCountryChange}
        onPopupVisibleChange={handleDropdownVisibleChange}
        options={filteredOptions}
        popupClassName={popupClass}
        showAction={["click"]}
        showSearch={false}
        value={selectedCountry}
      />

      <input
        autoComplete="new-password"
        className={inputClass[showError ? "error" : "default"]}
        enterKeyHint="done"
        maxLength={telephone.country === "CZ" ? 16 : 100}
        name="phone"
        onBlur={handleBlur}
        onChange={handlePhoneChange}
        placeholder={phonePlaceholder}
        spellCheck="false"
        type="tel"
        value={telephone.value}
      />

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

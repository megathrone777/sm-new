"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Select from "@rc-component/select";
import { AsYouType, getCountryCallingCode, getExampleNumber, type Examples } from "libphonenumber-js";
import examplesJson from "libphonenumber-js/examples.mobile.json";
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

const examples = examplesJson as unknown as Examples;

const getFormatPlaceholder = (country: CountryCode): string => {
  const example = getExampleNumber(country, examples);
  const prefix = `+${getCountryCallingCode(country)}`;

  if (!example) return prefix;

  return prefix + example.formatInternational().slice(prefix.length).replace(/\d/g, "X");
};

const Phone: React.FC<TProps> = ({ isError, phoneNumber }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [countrySelected, setCountrySelected] = useState(false);
  const [partialCountry, setPartialCountry] = useState<CountryCode | undefined>();
  const [touched, setTouched] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
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

  const getOptions = (): TOptionData[] =>
    countries.map<TOptionData>(({ code, name }) => ({
      label: name,
      value: code,
    }));

  const handleCountryChange = (value: CountryCode): void => {
    setCountrySelected(true);
    setPartialCountry(undefined);
    telephone.onChangeCountry(value);
  };

  const handleMouseDown = (
    event: React.SyntheticEvent<HTMLButtonElement | HTMLInputElement>,
  ): void => {
    event.stopPropagation();
  };

  const handleDropdownVisibleChange = (isOpened: boolean): void => {
    if (isOpened) {
      setTimeout(() => searchRef.current?.focus(), 0);
    } else {
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

    const asYouType = new AsYouType();

    asYouType.input(currentTarget.value);
    setPartialCountry(asYouType.getCountry() as CountryCode | undefined);
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
        options={getOptions()}
        popupClassName={popupClass}
        showAction={["click"]}
        showSearch={{
          autoClearSearchValue: true,
          filterOption: (input: string, option) =>
            `${option?.label ?? ""}`.toLowerCase().includes(input.toLowerCase()),
          onSearch: setSearchValue,
          searchValue,
        }}
        value={effectiveCountry}
      />

      <input
        autoComplete="new-password"
        className={inputClass[showError ? "error" : "default"]}
        enterKeyHint="done"
        maxLength={getFormatPlaceholder(effectiveCountry).length}
        name="phone"
        onBlur={handleBlur}
        onChange={handlePhoneChange}
        placeholder={getFormatPlaceholder(effectiveCountry)}
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

"use client";
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Select from "@rc-component/select";
import { countries, getCountryFlag, useTelephone, type CountryCode } from "use-telephone";

import { updatePhone } from "@/app/(web)/_actions";
import { Icon } from "@/ui";

import { Option, type TOption } from "./Option";

import {
  errorIconClass,
  inputClass,
  inputWrapperClass,
  layoutClass,
  popupClass,
  searchWrapperClass,
  searchInputClass,
} from "./Phone.css";

import type { TProps } from "./Phone.types";

const Phone: React.FC<TProps> = ({ isError, phoneNumber }) => {
  const inputId = useId();
  const [searchValue, setSearchValue] = useState<string>("");
  const [countrySelected, setCountrySelected] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const telephone = useTelephone({
    initialValue: phoneNumber ? phoneNumber : "+420",
  });

  const getOptions = (): TOption[] =>
    countries.map(
      ({ code, name }): TOption => ({
        label: name,
        value: code,
      }),
    );

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
  };

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
      className={inputWrapperClass}
      style={{ gridTemplateColumns: Boolean(isError) ? "auto 1fr auto" : "auto 1fr" }}
    >
      <Select
        className={layoutClass}
        id="phone-select"
        labelRender={({ value }) => (
          <span style={{ display: "block", height: 15, width: 20 }}>
            <img
              alt="Country flag."
              src={getCountryFlag(value as CountryCode)}
              style={{
                display: "block",
                width: "100%",
              }}
            />
          </span>
        )}
        menuItemSelectedIcon={null}
        notFoundContent="Nenalezeno"
        onChange={handleCountryChange}
        onPopupVisibleChange={handleDropdownVisibleChange}
        optionRender={({ label, value }): React.ReactElement => (
          <Option
            {...{ label }}
            value={value as CountryCode}
          />
        )}
        options={getOptions()}
        popupClassName={popupClass}
        popupRender={(menu): React.ReactElement => (
          <>
            <div className={searchWrapperClass}>
              <input
                autoComplete="off"
                className={searchInputClass}
                name={`search-input-selectbox-${inputId}`}
                onChange={handleInputChange}
                onMouseDown={handleMouseDown}
                placeholder="Search..."
                ref={searchRef}
                spellCheck="false"
                type="text"
                value={searchValue}
              />
            </div>

            {menu}
          </>
        )}
        showAction={["click"]}
        showSearch={{
          autoClearSearchValue: true,
          filterOption: (input: string, option) =>
            String(option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase()),
          onSearch: setSearchValue,
          searchValue,
        }}
        value={
          !countrySelected && telephone.country === "AF" && !phoneNumber ? "CZ" : telephone.country
        }
      />

      <input
        autoComplete="off"
        className={inputClass[Boolean(isError) ? "error" : "default"]}
        maxLength={telephone.country === "CZ" ? 16 : 100}
        name="phone"
        onChange={handlePhoneChange}
        spellCheck="false"
        type="tel"
        value={telephone.value}
      />

      {Boolean(isError) && (
        <Icon
          className={errorIconClass}
          id="exclamation"
        />
      )}
    </div>
  );
};

export { Phone };

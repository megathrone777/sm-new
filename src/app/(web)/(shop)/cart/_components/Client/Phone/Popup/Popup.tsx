import React, { useEffect, useId, useRef, useState } from "react";
import { getCountryCallingCode } from "libphonenumber-js";
import { countries, getCountryFlag, type CountryCode } from "use-telephone";

import { useClickOutside } from "@/hooks";

import {
  imageClass,
  listClass,
  optionClass,
  optionCodeClass,
  optionImageClass,
  popupClass,
  searchInputClass,
  searchWrapperClass,
  triggerClass,
  wrapperClass,
} from "./Popup.css";

import type { TOption, TProps } from "./Popup.types";

const Popup: React.FC<TProps> = ({ countryCode, onCountryChange }) => {
  const inputId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState<boolean>(false);
  const [isOpened, toggleOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const fitleredOptions: TOption[] = countries
    .filter(({ name }): boolean => name.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ code, name }) => ({
      label: name,
      value: code,
    }));

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setSearchValue(currentTarget.value);
  };

  const handleOptionClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    onCountryChange(currentTarget.value as CountryCode);
    toggleOpened(false);

    setTimeout((): void => {
      setSearchValue("");
    }, 300);
  };

  const handleToggleClick = (): void => {
    toggleOpened(!isOpened);
  };

  useClickOutside(wrapperRef, (): void => {
    if (isOpened) {
      toggleOpened(false);
    }
  });

  useEffect((): void => {
    setMounted(true);
  }, []);

  return (
    <div
      className={wrapperClass}
      ref={wrapperRef}
    >
      <button
        className={triggerClass}
        onClick={handleToggleClick}
        type="button"
      >
        <img
          alt={`Country flag ${countryCode}.`}
          className={imageClass}
          src={getCountryFlag(countryCode)}
        />
      </button>

      {isMounted && (
        <div className={popupClass[isOpened ? "opened" : "closed"]}>
          <div className={searchWrapperClass}>
            <input
              autoComplete="new-password"
              autoFocus={false}
              className={searchInputClass}
              name={`search-input-phone-${inputId}`}
              onChange={handleInputChange}
              placeholder="Hledat..."
              spellCheck="false"
              tabIndex={-1}
              type="text"
              value={searchValue}
            />
          </div>

          <ul className={listClass}>
            {fitleredOptions.map<React.ReactElement>(({ label, value }: TOption) => (
              <li key={`phone-country-${label}`}>
                <button
                  {...{ value }}
                  className={optionClass}
                  onClick={handleOptionClick}
                  type="button"
                >
                  <img
                    alt={value}
                    className={optionImageClass}
                    src={getCountryFlag(value)}
                  />

                  <span>{label}</span>
                  <span className={optionCodeClass}>(+{getCountryCallingCode(value)})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Popup };

"use client";
import React, { useId, useState } from "react";
import Select from "@rc-component/select";

import { Icon } from "@/ui";

import {
  closeButtonClass,
  iconClass,
  labelClass,
  layoutClass,
  popupClass,
  searchInputClass,
  searchWrapperClass,
  suffixClass,
  tagClass,
  wrapperClass,
} from "./Selectbox.css";

import type { TProps } from "./Selectbox.types";

const Selectbox: React.FC<TProps> = ({
  defaultValue,
  id,
  label,
  mode,
  onChange,
  optionRender,
  options,
  placeholder,
  style,
}) => {
  const inputId = useId();
  const [searchValue, setSearchValue] = useState<string>("");

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

  const handleChange: NonNullable<TProps["onChange"]> = (value, option): void => {
    setSearchValue("");
    onChange?.(value, option);
  };

  const filteredOptions = options?.filter((option) =>
    `${option?.label ?? ""}`.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className={wrapperClass}>
      {label && <p className={labelClass}>{label}</p>}

      <Select
        {...{ defaultValue, id, mode, optionRender, placeholder, style }}
        className={layoutClass}
        maxTagTextLength={80}
        menuItemSelectedIcon={
          <Icon
            className={iconClass}
            id="checkmark"
          />
        }
        notFoundContent="Nenalezeno"
        onChange={handleChange}
        onPopupVisibleChange={handleDropdownVisibleChange}
        options={filteredOptions}
        popupClassName={popupClass}
        popupRender={(menu): React.ReactElement => (
          <>
            <div className={searchWrapperClass}>
              <input
                autoComplete="off"
                className={searchInputClass}
                name={`search-input-selectbox-${inputId}`}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}
                onMouseDown={handleMouseDown}
                placeholder="Search..."
                spellCheck="false"
                type="text"
                value={searchValue}
              />
            </div>

            {menu}
          </>
        )}
        removeIcon={
          <Icon
            className={iconClass}
            id="close"
          />
        }
        showAction={["click"]}
        showSearch={false}
        suffix={
          <Icon
            className={suffixClass}
            id="angle"
          />
        }
        tagRender={({ label, onClose }): React.ReactElement => (
          <div className={tagClass}>
            <span>{label}</span>

            <button
              className={closeButtonClass}
              onClick={(event: React.SyntheticEvent<HTMLButtonElement>): void => {
                event.stopPropagation();
                onClose();
              }}
              onMouseDown={handleMouseDown}
              type="button"
            >
              <Icon
                className={iconClass}
                id="close"
              />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export { Selectbox };

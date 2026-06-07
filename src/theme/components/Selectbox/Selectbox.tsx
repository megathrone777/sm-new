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

  return (
    <div className={wrapperClass}>
      {label && <p className={labelClass}>{label}</p>}

      <Select
        {...{ defaultValue, id, mode, onChange, optionRender, options, placeholder, style }}
        autoFocus={false}
        className={layoutClass}
        components={{ input: <input readOnly /> }}
        getPopupContainer={(trigger): HTMLElement => {
          return (trigger as HTMLElement).parentElement ?? document.body;
        }}
        maxTagTextLength={80}
        menuItemSelectedIcon={
          <Icon
            className={iconClass}
            id="checkmark"
          />
        }
        notFoundContent="Nenalezeno"
        onPopupVisibleChange={handleDropdownVisibleChange}
        popupAlign={{ offset: [0, 0], overflow: { adjustX: false, adjustY: false } }}
        popupClassName={popupClass}
        popupRender={(menu): React.ReactElement => (
          <>
            <div className={searchWrapperClass}>
              <input
                autoComplete="off"
                autoFocus={false}
                className={searchInputClass}
                name={`search-input-selectbox-${inputId}`}
                onChange={handleInputChange}
                onMouseDown={handleMouseDown}
                placeholder="Hledat..."
                spellCheck="false"
                type="text"
                value={searchValue}
              />
            </div>

            <React.Fragment key={`${inputId}-popup-${searchValue}`}>{menu}</React.Fragment>
          </>
        )}
        popupStyle={{
          top: 33,
        }}
        removeIcon={
          <Icon
            className={iconClass}
            id="close"
          />
        }
        showAction={["click"]}
        showScrollBar={false}
        showSearch={{
          autoClearSearchValue: true,
          filterOption: (input: string, option) =>
            `${option?.label ?? ""}`.toLowerCase().includes(input.toLowerCase()),
          onSearch: setSearchValue,
          searchValue,
        }}
        suffix={
          <Icon
            className={suffixClass}
            id="angle"
          />
        }
        tabIndex={-1}
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
        virtual={false}
      />
    </div>
  );
};

export { Selectbox };

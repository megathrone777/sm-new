"use client";
import React, { useRef, useState } from "react";
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
  tagClass,
  wrapperClass,
} from "./Selectbox.css";

import type { TProps } from "./Selectbox.types";

const Selectbox: React.FC<TProps> = ({ defaultValue, label, mode, onChange, options }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className={wrapperClass}>
      {label && <p className={labelClass}>{label}</p>}

      <Select
        {...{ defaultValue, mode, onChange, options }}
        className={layoutClass}
        listItemHeight={22}
        maxTagTextLength={80}
        menuItemSelectedIcon={
          <Icon
            className={iconClass}
            id="checkmark"
          />
        }
        onPopupVisibleChange={handleDropdownVisibleChange}
        popupClassName={popupClass}
        popupRender={(menu): React.ReactElement => (
          <>
            <div className={searchWrapperClass}>
              <input
                className={searchInputClass}
                onChange={handleInputChange}
                onMouseDown={handleMouseDown}
                placeholder="Search..."
                ref={searchRef}
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
        showSearch={{
          filterOption: (input: string, option) =>
            String(option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase()),
          onSearch: setSearchValue,
          searchValue,
        }}
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

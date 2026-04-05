"use client";
import React from "react";
import Select from "@rc-component/select";

import { Icon } from "@/ui";

import {
  closeButtonClass,
  iconClass,
  labelClass,
  layoutClass,
  popupClass,
  tagClass,
  wrapperClass,
} from "./Selectbox.css";

import type { TProps } from "./Selectbox.types";

const Selectbox: React.FC<TProps> = ({ defaultValue, label, mode, onChange, options }) => (
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
      popupClassName={popupClass}
      removeIcon={
        <Icon
          className={iconClass}
          id="close"
        />
      }
      tagRender={({ label, onClose }) => (
        <div className={tagClass}>
          <span>{label}</span>

          <button
            className={closeButtonClass}
            onClick={onClose}
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

export { Selectbox };

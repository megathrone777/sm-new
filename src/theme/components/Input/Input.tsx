import React, { useId } from "react";

import { Icon } from "@/ui";

import {
  errorIconClass,
  iconClass,
  inputClass,
  labelClass,
  layoutClass,
  wrapperClass,
} from "./Input.css";

import type { TProps } from "./Input.types";

const Input: React.FC<TProps> = ({
  defaultValue,
  disabled,
  iconId,
  isError,
  label,
  maxLength,
  name,
  onChange,
  placeholder,
  type,
  value,
}) => {
  const inputId = useId();

  return (
    <div className={wrapperClass}>
      {label && !!label.length && (
        <label
          className={labelClass}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}

      <div className={layoutClass}>
        {iconId && (
          <Icon
            className={iconClass}
            id={iconId}
          />
        )}

        <input
          autoComplete="off"
          className={inputClass[isError ? "isError" : "isDefault"]}
          id={inputId}
          spellCheck="false"
          {...{
            defaultValue,
            disabled,
            maxLength,
            name,
            onChange,
            placeholder,
            type,
            value,
          }}
        />

        {isError && (
          <Icon
            className={errorIconClass}
            id="exclamation"
          />
        )}
      </div>
    </div>
  );
};

export { Input };

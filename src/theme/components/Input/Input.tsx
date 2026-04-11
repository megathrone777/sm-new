import React, { useId } from "react";

import { Icon } from "@/ui";

import {
  errorIconClass,
  iconClass,
  iconHolderClass,
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

      <div
        className={layoutClass}
        style={{
          gridTemplateColumns: iconId
            ? isError
              ? "auto 1fr auto"
              : "auto 1fr"
            : isError
              ? "1fr auto"
              : "1fr",
        }}
      >
        {iconId && (
          <div className={iconHolderClass}>
            <Icon
              className={iconClass}
              id={iconId}
            />
          </div>
        )}

        <input
          autoComplete="off"
          className={inputClass[isError ? "error" : "default"]}
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

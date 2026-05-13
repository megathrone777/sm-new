"use client";
import React, { useEffect, useId, useState } from "react";

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

const CYRILLIC_REGEX = /[Ѐ-ӿԀ-ԯⷠ-ⷿꙀ-ꚟ]/;

const Input: React.FC<TProps> = ({
  iconId,
  isError,
  label,
  onBeforeInput,
  onBlur,
  restrictCyrillic,
  ...rest
}) => {
  const inputId = useId();
  const [showError, setShowError] = useState<boolean>(Boolean(isError));

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { currentTarget } = event;

    if (currentTarget.value.trim()) {
      setShowError(false);
    }

    onBlur?.(event);
  };

  const handleBeforeInput = (event: React.InputEvent<HTMLInputElement>): void => {
    if (restrictCyrillic) {
      const { data } = event.nativeEvent;

      if (data && CYRILLIC_REGEX.test(data)) {
        event.preventDefault();

        return;
      }
    }

    onBeforeInput?.(event);
  };

  useEffect((): void => {
    setShowError(Boolean(isError));
  }, [isError]);

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
            ? showError
              ? "auto 1fr auto"
              : "auto 1fr"
            : showError
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
          autoComplete="new-password"
          className={inputClass[showError ? "error" : "default"]}
          id={inputId}
          onBeforeInput={handleBeforeInput}
          onBlur={handleBlur}
          spellCheck="false"
          {...rest}
        />

        {showError && (
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

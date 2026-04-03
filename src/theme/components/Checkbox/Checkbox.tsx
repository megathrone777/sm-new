import React, { useId } from "react";

import { wrapperClass, labelClass } from "./Checkbox.css";

import type { TProps } from "./Checkbox.types";

const Checkbox: React.FC<TProps> = ({
  checked,
  className,
  defaultChecked,
  disabled,
  hint,
  label,
  labelClassName,
  labelImage,
  name,
  template = "normal",
  type,
  value,
}) => {
  const inputId = useId();

  return (
    <div
      className={`
        ${wrapperClass[template]}
        ${className}
      `}
    >
      <input
        {...{
          checked,
          className,
          defaultChecked,
          disabled,
          name,
          type,
          value,
        }}
        id={inputId}
      />

      <label
        className={`
          ${labelClass}
          ${labelClassName ? labelClassName : ""}
        `}
        htmlFor={inputId}
      >
        <span>
          {label}
          {Boolean(hint) && <span>{hint}</span>}
        </span>

        {labelImage}
      </label>
    </div>
  );
};

export { Checkbox };

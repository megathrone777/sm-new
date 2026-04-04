import React, { useId } from "react";

import { Icon } from "@/ui";

import { iconClass, layoutClass, inputClass, labelClass, wrapperClass } from "./Checkbox.css";

import type { TProps } from "./Checkbox.types";

const Checkbox: React.FC<TProps> = ({
  checked,
  className,
  disabled,
  hint,
  label,
  labelClassName,
  name,
  onChange,
  template = "normal",
  type,
  value,
}) => {
  const inputId = useId();

  return (
    <div className={`${wrapperClass} ${className ? className : ""}`}>
      <span className={layoutClass[template]}>
        <input
          {...{
            checked,
            disabled,
            name,
            onChange,
            type,
            value,
          }}
          className={inputClass}
          id={inputId}
        />

        <Icon
          className={iconClass[template]}
          id="checkmark"
        />
      </span>

      <label
        className={`${labelClass[template]} ${labelClassName ? labelClassName : ""}`}
        htmlFor={inputId}
      >
        <span>
          {label}
          {Boolean(hint) && <span>{hint}</span>}
        </span>
      </label>
    </div>
  );
};

export { Checkbox };

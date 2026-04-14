import React from "react";
import { getCountryFlag } from "use-telephone";

import { iconClass, wrapperClass } from "./Option.css";

import type { TProps } from "./Option.types";

const Option: React.FC<TProps> = ({ label, value }) => (
  <span className={wrapperClass}>
    <img
      alt={value}
      className={iconClass}
      src={getCountryFlag(value)}
    />

    {label}
  </span>
);

export { Option };

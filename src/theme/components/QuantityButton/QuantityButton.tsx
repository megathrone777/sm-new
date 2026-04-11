import React from "react";

import { Icon } from "@/ui";

import { buttonClass, iconClass } from "./QuantityButton.css";

import type { TProps } from "./QuantityButton.types";

const QuantityButton: React.FC<TProps> = ({ decrease, type = "button", ...rest }) => (
  <button
    className={buttonClass}
    {...rest}
    {...{ type }}
  >
    <Icon
      className={iconClass}
      id={decrease ? "minus" : "plus"}
    />
  </button>
);

export { QuantityButton };

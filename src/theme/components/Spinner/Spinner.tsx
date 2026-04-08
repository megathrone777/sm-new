import React from "react";

import { wrapperClass } from "./Spinner.css";

import type { TProps } from "./Spinner.types";

const Spinner: React.FC<TProps> = ({ color = "#da2629", template = "normal" }) => (
  <div
    className={wrapperClass[template]}
    style={{
      borderColor: color,
      borderTopColor: "transparent",
    }}
  />
);

export { Spinner };

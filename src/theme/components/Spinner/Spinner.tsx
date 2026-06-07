import React from "react";

import { colors } from "@/theme/variables";

import { wrapperClass } from "./Spinner.css";

import type { TProps } from "./Spinner.types";

const Spinner: React.FC<TProps> = ({ color = colors.red, template = "normal" }) => (
  <div
    className={wrapperClass[template]}
    style={{
      borderColor: color,
      borderTopColor: "transparent",
    }}
  />
);

export { Spinner };

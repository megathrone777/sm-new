import React from "react";

import { wrapperClass } from "./Spinner.css";

import type { TProps } from "./Spinner.types";

const Spinner: React.FC<TProps> = ({ template = "normal" }) => (
  <div className={wrapperClass[template]} />
);

export { Spinner };

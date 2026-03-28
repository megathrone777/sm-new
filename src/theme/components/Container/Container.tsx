import React from "react";

import { wrapperClass } from "./Container.css";

import type { TProps } from "./Container.types";

const Container: React.FC<TProps> = ({ children }) => (
  <div className={wrapperClass}>{children}</div>
);

export { Container };

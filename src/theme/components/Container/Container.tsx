import React from "react";

import { wrapperClass } from "./Container.css";

import type { TProps } from "./Container.types";

const Container: React.FC<TProps> = ({ children, fluid }) => (
  <div className={wrapperClass[Boolean(fluid) ? "fluid" : "default"]}>{children}</div>
);

export { Container };

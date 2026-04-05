import React from "react";

import { wrapperClass, titleClass } from "./Header.css";

import type { TProps } from "./Header.types";

const Header: React.FC<TProps> = ({ children, title }) => (
  <div className={wrapperClass}>
    <h1 className={titleClass}>{title}</h1>
    {children && <div>{children}</div>}
  </div>
);

export { Header };

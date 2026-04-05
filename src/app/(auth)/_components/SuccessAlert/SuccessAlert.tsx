import React from "react";

import { wrapperClass, layoutClass } from "./SuccessAlert.css";

import type { TProps } from "./SuccessAlert.types";

const SuccessAlert: React.FC<TProps> = ({ title }) => (
  <div className={wrapperClass}>
    <p
      className={layoutClass}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  </div>
);

export { SuccessAlert };

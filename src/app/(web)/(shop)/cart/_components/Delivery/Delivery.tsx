import React from "react";

import { Address } from "./Address";

import { wrapperClass } from "./Delivery.css";

import type { TProps } from "./Delivery.types";

const Delivery: React.FC<TProps> = () => (
  <div className={wrapperClass}>
    <Address />
  </div>
);

export { Delivery };

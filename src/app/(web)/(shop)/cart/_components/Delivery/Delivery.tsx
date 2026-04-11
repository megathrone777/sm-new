import React from "react";

import { Address } from "./Address";
import { Client } from "./Client";
import { TypeSwitcher } from "./TypeSwitcher";

import { layoutClass, wrapperClass } from "./Delivery.css";

import type { TProps } from "./Delivery.types";

const Delivery: React.FC<TProps> = ({ email, name, phoneNumber, totalPrice, type }) => (
  <div className={wrapperClass}>
    <TypeSwitcher {...{ totalPrice, type }} />

    <div className={layoutClass}>
      <Client {...{ email, name, phoneNumber }} />
      <Address />
    </div>
  </div>
);

export { Delivery };

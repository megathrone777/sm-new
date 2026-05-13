import React from "react";

import { countClass, listClass, itemClass } from "./Additionals.css";

import type { TProps } from "./Additionals.types";

const Additionals: React.FC<TProps> = ({ additionals }) => (
  <ul className={listClass}>
    {additionals.map<React.ReactElement>(({ id, quantity, title }: TOrderAdditional) => (
      <li
        className={itemClass}
        key={`${id}-order-additional`}
      >
        {title}
        <b className={countClass}>x{quantity}</b>
      </li>
    ))}
  </ul>
);

export { Additionals };

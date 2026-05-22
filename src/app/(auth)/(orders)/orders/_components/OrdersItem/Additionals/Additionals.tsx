import React from "react";

import { itemClass, listClass, wrapperClass } from "./Additionals.css";

import type { TProps } from "./Additionals.types";

const Additionals: React.FC<TProps> = ({ items, orderId }) => (
  <div className={wrapperClass}>
    <ul className={listClass}>
      {items.map(
        ({ id, quantity, title }: TOrderAdditional): React.ReactElement => (
          <li
            className={itemClass}
            key={`${id}-additional-${orderId}`}
          >
            {title} {quantity > 1 ? `x${quantity}` : ""}
          </li>
        ),
      )}
    </ul>
  </div>
);

export { Additionals };

import React from "react";

import { itemClass, listClass, subItem2Class, subItemClass, subListClass } from "./Products.css";

import type { TProps } from "./Products.types";

const Products: React.FC<TProps> = ({ products }) => (
  <ul className={listClass}>
    {products.map<React.ReactElement>(({ id, modifiers, quantity, title }: TOrderProduct) => (
      <li
        className={itemClass}
        key={`${id}-order-product`}
      >
        {title} {quantity > 1 ? `(x${quantity})` : ""}
        {modifiers.length > 0 && (
          <ul className={subListClass}>
            {modifiers.map<React.ReactElement>(
              ({ id: modifierId, subModifier, title: modifierTitle }) => (
                <li
                  className={subItemClass}
                  key={`modification-${modifierId}`}
                >
                  {modifierTitle}

                  {subModifier && <span className={subItem2Class}>{subModifier.title}</span>}
                </li>
              ),
            )}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

export { Products };

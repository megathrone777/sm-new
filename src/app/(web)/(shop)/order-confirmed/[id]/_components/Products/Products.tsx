import React from "react";

import {
  listClass,
  modifierClass,
  quantityClass,
  subModifierClass,
  titleClass,
} from "./Products.css";

import type { TProps } from "./Products.types";

const Products: React.FC<TProps> = ({ products }) => (
  <ul className={listClass}>
    {products.map<React.ReactElement>(({ id, modifiers, quantity, title }: TOrderProduct) => (
      <li key={`${id}-order-product`}>
        <p className={titleClass}>
          <b>{title}</b>
          <b className={quantityClass}>(x{quantity})</b>
        </p>

        {modifiers && !!modifiers.length && (
          <ul className={listClass}>
            {modifiers.map<React.ReactElement>(({ id, subModifier, title }) => (
              <li
                className={modifierClass}
                key={`${id}-order-modifier`}
              >
                {title}

                {subModifier && Object.keys(subModifier).length > 0 && (
                  <span className={subModifierClass}>{subModifier.title}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

export { Products };

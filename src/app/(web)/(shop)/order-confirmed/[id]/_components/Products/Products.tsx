import React from "react";

import { listClass, titleClass, modifierClass, subModifierClass } from "./Products.css";

import type { TProps } from "./Products.types";

const Products: React.FC<TProps> = ({ products }) => (
  <ul className={listClass}>
    {products.map(
      ({ id, modifiers, quantity, title }: TOrderProduct): React.ReactElement => (
        <li key={`${id}-order-product`}>
          <p className={titleClass}>
            <b>{title}</b> <b>x{quantity}</b>
          </p>

          {modifiers && !!modifiers.length && (
            <ul>
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
      ),
    )}
  </ul>
);

export { Products };

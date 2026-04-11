import React from "react";
import Image from "next/image";
import Link from "next/link";

import { QuantityControls } from "./QuantityControls";

import {
  heroClass,
  imageClass,
  imageHolderClass,
  layoutClass,
  linkClass,
  modifierClass,
  subModifierClass,
  titleClass,
  weightClass,
  wrapperClass,
} from "./ProductRow.css";

import type { TProps } from "./ProductRow.types";

const ProductRow: React.FC<TProps> = ({
  imageUrl,
  index,
  modifiers,
  onRemove,
  quantity,
  slug,
  title,
  totalPrice,
  weight,
}) => (
  <div className={wrapperClass}>
    <div className={layoutClass}>
      <div className={imageHolderClass}>
        <Link
          className={linkClass}
          href={`/product/${slug}`}
        >
          <Image
            alt={title}
            className={imageClass}
            height={0}
            sizes="100vw"
            src={imageUrl}
            width={0}
          />
        </Link>
      </div>

      <div className={heroClass}>
        <p className={titleClass}>{title}</p>
        <p className={weightClass}>{weight}</p>

        {modifiers &&
          !!modifiers.length &&
          modifiers.map(
            ({ id: modifierID, subModifier, title }: TCartModifier): React.ReactElement => (
              <ul key={`${modifierID}-modifier`}>
                <li className={modifierClass}>
                  {title}
                  <br />

                  {subModifier && <span className={subModifierClass}>{subModifier.title}</span>}
                </li>
              </ul>
            ),
          )}
      </div>
    </div>

    <div className={layoutClass}>
      <QuantityControls {...{ index, onRemove, quantity, totalPrice }} />
    </div>
  </div>
);

export { ProductRow };

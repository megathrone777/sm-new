import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Submit } from "./Submit";

import {
  actionsClass,
  contentClass,
  imageClass,
  imageHolderClass,
  textClass,
  linkClass,
  placeholderClass,
  priceClass,
  titleClass,
  wrapperClass,
} from "./ProductsItem.css";

import type { TProps } from "./ProductsItem.types";

const ProductsItem: React.FC<TProps> = (product) => {
  const { composition, description, imageUrl, isAvailable, price, slug, title, weight } = product;

  return (
    <div className={wrapperClass}>
      <Link
        className={linkClass}
        href={`/product/${slug}`}
      >
        <div className={imageHolderClass}>
          <Image
            alt={title}
            className={imageClass}
            fill
            src={imageUrl}
          />
        </div>

        <div className={contentClass}>
          <p className={titleClass}>{title}</p>
          <p className={textClass}>{weight}</p>
          {composition && <p className={textClass}>{composition}</p>}
          {description && <p className={textClass}>{description}</p>}
        </div>
      </Link>

      <div className={actionsClass}>
        <p className={priceClass}>{price} Kč</p>

        {isAvailable ? (
          <Submit {...product} />
        ) : (
          <p className={placeholderClass}>
            Momentálně
            <br />
            nedostupný
          </p>
        )}
      </div>
    </div>
  );
};

export { ProductsItem };

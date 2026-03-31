"use client";
import React from "react";
import Link from "next/link";

import { cartActions } from "@/app/actions";

import type { TProps } from "./Item.types";

const Item: React.FC<TProps> = (product) => {
  const { slug, sortOrder, title } = product;

  return (
    <div>
      <Link href={`/product/${slug}`}>
        Product: {title} - ({sortOrder})
      </Link>

      <button
        onClick={async (): Promise<void> => {
          await cartActions.addProduct({
            ...product,
            isPromotionActive: false,
            quantity: 1,
            totalPrice: product.price,
          });
        }}
        type="button"
      >
        Add to cart
      </button>
    </div>
  );
};

export { Item };

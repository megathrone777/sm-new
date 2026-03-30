"use client";
import React from "react";

import { cartActions } from "@/app/actions";

import type { TProps } from "./Products.types";

const Products: React.FC<TProps> = ({ categories }) => {
  const allProducts: TProduct[] = categories.reduce<TProduct[]>(
    (accumulator, { products }) => [...accumulator, ...products],
    [],
  );

  return (
    <div>
      {allProducts && !!allProducts.length && (
        <div>
          {allProducts.map(
            ({ categoryId, id, slug, title }: TProduct): React.ReactElement => (
              <div key={`products-item-${id}-${categoryId}-${slug}`}>
                <p>{title}</p>

                <button
                  onClick={async (): Promise<void> => {
                    await cartActions.addProduct(slug);
                  }}
                  type="button"
                >
                  Add to cart
                </button>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export { Products };

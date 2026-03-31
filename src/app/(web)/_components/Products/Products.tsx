import React from "react";

import { Item } from "./Item";

import type { TProps } from "./Products.types";

const Products: React.FC<TProps> = ({ categories }) => (
  <div>
    {categories.map(({ id, products, title }) => (
      <div key={`category-${id}`}>
        <h2 style={{ fontWeight: "bold" }}>Category: {title}</h2>

        <div style={{ paddingLeft: 20 }}>
          {products.map((product: TProduct): React.ReactElement => {
            const { categoryId, slug } = product;

            return (
              <Item
                key={`products-item-${id}-${categoryId}-${slug}`}
                {...product}
              />
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

export { Products };

import React from "react";

import { getCategoriesWithProducts } from "@/helpers";
import { Container } from "@/ui";

import { ProductsItem } from "./ProductsItem";
import { ProductsLayout } from "./ProductsLayout";

import { wrapperClass } from "./Products.css";

import type { TProps } from "./Products.types";

const Products: React.FC<TProps> = async ({ showAll, title }) => {
  const categories = await getCategoriesWithProducts();

  const renderedProducts = categories.reduce<Record<TProductCategory["id"], React.ReactNode[]>>(
    (
      accumulator,
      { id, isPromotionActive, products, promotionDiscountAmount, promotionForEveryXProducts },
    ) => ({
      ...accumulator,
      [id]: products.map(
        (product: TProduct): React.ReactElement => (
          <ProductsItem
            key={`${product.id}-products-item`}
            {...product}
            {...{ isPromotionActive, promotionDiscountAmount, promotionForEveryXProducts }}
          />
        ),
      ),
    }),
    {},
  );

  return (
    <div
      className={wrapperClass}
      id="products-section"
    >
      <Container>
        <ProductsLayout {...{ categories, renderedProducts, showAll, title }} />
      </Container>
    </div>
  );
};

export { Products };

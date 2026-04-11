import React from "react";

import { productsHelpers } from "@/helpers/products";
import { Container } from "@/ui";

import { ProductsItem } from "./ProductsItem";
import { ProductsLayout } from "./ProductsLayout";

import { layoutClass, wrapperClass } from "./Products.css";

import type { TProps } from "./Products.types";

const Products: React.FC<TProps> = async ({ showAll, title }) => {
  const categories = await productsHelpers.getCategories();

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
        <div className={layoutClass}>
          <ProductsLayout {...{ categories, renderedProducts, showAll, title }} />
        </div>
      </Container>
    </div>
  );
};

export { Products };

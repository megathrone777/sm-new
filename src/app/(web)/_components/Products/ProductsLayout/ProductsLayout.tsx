"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { titleClass } from "./ProductsLayout.css";

import type { TProps } from "./ProductsLayout.types";

const ProductsLayout: React.FC<TProps> = ({ categories, renderedProducts, showAll, title }) => {
  const pathname = usePathname();
  const [categoryId, setCategoryId] = useState<number>(() => (showAll ? 0 : -1));

  const handleCategoryClick = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): void => {
    setCategoryId(+currentTarget.value);
  };

  // const filteredCategories = categories.filter(({ id }) => id !== categoryId);

  // const renderProductsList = useMemo((): null | React.ReactElement => {
  //   const activeCategory = categories.find(
  //     ({ id }: TProductCategory): boolean => id === categoryId,
  //   );

  //   if (activeCategory) {
  //     const { isPromotionActive, products, promotionDiscountAmount, promotionForEveryXProducts } =
  //       activeCategory;

  //     return (
  //       <div style={{ display: "grid", gridAutoColumns: "minmax(30%, 1fr)", paddingLeft: 20 }}>
  //         {products.map((product: TProduct) => {})}
  //       </div>
  //     );
  //   }

  //   return null;
  // }, [categoryId]);

  const activeCategory = categories.find(({ id }: TProductCategory): boolean => id === categoryId);

  return (
    <>
      <h2 className={titleClass[pathname !== "/" ? "isSmall" : "isNormal"]}>{title}</h2>

      <div>
        {categories.map(({ id, title }) => (
          <button
            key={`products-category-item-${id}`}
            onClick={handleCategoryClick}
            style={{
              backgroundColor: activeCategory?.id === id ? "yellowgreen" : "gray",
            }}
            type="button"
            value={id}
          >
            {title}
          </button>
        ))}
      </div>

      {activeCategory && renderedProducts[activeCategory.id]}
    </>
  );
};

export { ProductsLayout };

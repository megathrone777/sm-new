"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  listClass,
  tabButtonClass,
  tabClass,
  tabImageClass,
  tabLabelClass,
  tabsClass,
  tabsListClass,
  titleClass,
} from "./ProductsLayout.css";

import type { TProps } from "./ProductsLayout.types";

const ProductsLayout: React.FC<TProps> = ({ categories, renderedProducts, showAll, title }) => {
  const pathname = usePathname();
  const [categoryId, setCategoryId] = useState<number>(() => (showAll ? 0 : -1));

  const handleCategoryClick = useCallback(
    ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
      const currentId = +currentTarget.value;
      const newCategoryId: number = categoryId === currentId ? -1 : currentId;

      if (categoryId === -1) {
        document.getElementById("products-section")?.scrollIntoView();
      }

      setCategoryId(newCategoryId);
    },
    [categories, categoryId],
  );

  const activeCategory = categories.find(({ id }: TProductCategory): boolean => id === categoryId);
  const hasActiveCategory = categoryId !== -1;

  return (
    <>
      <h2 className={titleClass[pathname === "/" ? "default" : "small"]}>{title}</h2>

      <div className={tabsClass}>
        {categories && !!categories && (
          <ul className={tabsListClass[hasActiveCategory ? "collapsed" : "default"]}>
            {categories.map<React.ReactElement>(({ id, imageUrl, title }: TProductCategory) => (
              <li
                className={
                  activeCategory?.id === id
                    ? tabClass["active"]
                    : tabClass[hasActiveCategory ? "collapsed" : "default"]
                }
                key={`products-category-item-${id}`}
              >
                <button
                  className={tabButtonClass}
                  onClick={handleCategoryClick}
                  type="button"
                  value={id}
                >
                  <Image
                    alt={title}
                    className={tabImageClass}
                    height={0}
                    loading="eager"
                    sizes="100vw"
                    src={imageUrl}
                    width={0}
                  />

                  <span className={tabLabelClass}>{title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={listClass}>{activeCategory && renderedProducts[activeCategory.id]}</div>
    </>
  );
};

export { ProductsLayout };

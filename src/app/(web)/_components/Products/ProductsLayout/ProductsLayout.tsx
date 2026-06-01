"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  listClass,
  tabButtonClass,
  tabClass,
  tabImageClass,
  tabLabelClass,
  tabsListClass,
  titleClass,
} from "./ProductsLayout.css";

import type { TProps } from "./ProductsLayout.types";

const ProductsLayout: React.FC<TProps> = ({ categories, renderedProducts, showAll, title }) => {
  const pathname = usePathname();
  const [categoryId, setCategoryId] = useState<number>(() => (showAll ? 0 : -1));

  const handleCategoryClick = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const currentId = +currentTarget.value;
    const newCategoryId: number = categoryId === currentId ? -1 : currentId;
    const section = document.getElementById("products-section");

    if (section && section.getBoundingClientRect().top > 0) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    setCategoryId(newCategoryId);
  };

  const activeCategory = categories.find(({ id }: TProductCategory): boolean => id === categoryId);
  const hasActiveCategory = categoryId !== -1;

  return (
    <>
      <h2 className={titleClass[pathname === "/" ? "default" : "small"]}>{title}</h2>

      <div>
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
                    fill
                    loading="eager"
                    sizes="(min-width: 1023px) 25vw, 50vw"
                    src={imageUrl}
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

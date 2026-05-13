"use client";
import React, { startTransition, useOptimistic } from "react";

import { removeFromCart } from "@/app/(web)/_actions";

import { ProductsList } from "../ProductsList";
import { SectionLayout } from "../SectionLayout";

import type { TProps } from "./CartLayout.types";

const CartLayout: React.FC<TProps> = ({
  categoryDiscount,
  children,
  initialProducts,
  placeholder,
  productsTitle,
  queue,
}) => {
  const [products, removeProduct] = useOptimistic(
    initialProducts,
    (state: TCartProduct[], index: number): TCartProduct[] =>
      state.filter((_, productIndex: number): boolean => productIndex !== index),
  );

  const handleRemove = (index: number): void => {
    startTransition(async (): Promise<void> => {
      removeProduct(index);
      await removeFromCart(index);
    });
  };

  if (products.length === 0) return placeholder;

  return (
    <>
      <SectionLayout
        heroChildren={queue}
        title={productsTitle}
      >
        <ProductsList
          categoryDiscount={categoryDiscount}
          onRemove={handleRemove}
          products={products}
        />
      </SectionLayout>

      {children}
    </>
  );
};

export { CartLayout };

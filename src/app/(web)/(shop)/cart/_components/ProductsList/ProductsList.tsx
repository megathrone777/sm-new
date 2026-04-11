"use client";
import React, { startTransition, useOptimistic } from "react";

import { removeFromCart } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";

import { ProductRow } from "./ProductRow";

import { wrapperClass, discountClass, labelClass } from "./ProductsList.css";

import type { TProps } from "./ProductsList.types";

const ProductsList: React.FC<TProps> = ({ categoryDiscount, products }) => {
  const [optimisticProducts, optimisticRemove] = useOptimistic(
    products,
    (state: TCartProduct[], index: number): TCartProduct[] =>
      state.filter((_, i): boolean => i !== index),
  );
  const { t } = useTranslation();

  const handleRemove = (index: number): void => {
    startTransition(async (): Promise<void> => {
      optimisticRemove(index);
      await removeFromCart(index);
    });
  };

  const productsWithDiscount: TCartProduct[] = optimisticProducts.filter(
    ({ isPromotionActive }: TCartProduct): boolean => isPromotionActive,
  );

  const productsWithDiscountQuantity: number = productsWithDiscount.reduce(
    (accumulator: number, { quantity }: TCartProduct): number => accumulator + quantity,
    0,
  );

  const renderDiscount = (): null | React.ReactElement => {
    if (!!productsWithDiscount.length && productsWithDiscount[0]) {
      const { promotionDiscountAmount, promotionForEveryXProducts } = productsWithDiscount[0];
      const productsLeftTotal =
        promotionForEveryXProducts - (productsWithDiscountQuantity % promotionForEveryXProducts);

      return (
        <div className={discountClass}>
          {productsWithDiscountQuantity % promotionForEveryXProducts === 0 ? (
            <p>
              Dostal(a) jste Slevu{" "}
              <span className={labelClass}>
                -{categoryDiscount} {t<string>("currency")}
              </span>
            </p>
          ) : (
            <p>
              Přidejte ještě {productsLeftTotal} {productsLeftTotal > 1 ? "Rolly" : "Roll"} a
              získejte{" "}
              <span className={labelClass}>
                -{categoryDiscount + promotionDiscountAmount} {t<string>("currency")}
              </span>
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={wrapperClass}>
      {optimisticProducts.map(
        ({ id, title, ...rest }: TCartProduct, index: number): React.ReactElement => (
          <ProductRow
            key={`${id}-${crypto.randomUUID()}`}
            onRemove={(): void => handleRemove(index)}
            {...{ id, index, title, ...rest }}
          />
        ),
      )}

      {renderDiscount()}
    </div>
  );
};

export { ProductsList };

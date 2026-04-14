"use client";
import React, { startTransition, useOptimistic } from "react";

import { updateAdditionalQuantity } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";

import { AdditionalRow } from "./AdditionalRow";

import { listClass, wrapperClass } from "./Additionals.css";

import type { TProps } from "./Additionals.types";

const Additionals: React.FC<TProps> = ({ additionals, cartAdditionals }) => {
  const { t } = useTranslation();

  const displayAdditionals: TCartAdditional[] = additionals.map(
    (a: TAdditional): TCartAdditional => {
      const inCart = cartAdditionals.find((ca: TCartAdditional): boolean => ca.id === a.id);

      return inCart ?? { ...a, quantity: 0, totalPrice: 0 };
    },
  );

  const [optimisticAdditionals, optimisticUpdate] = useOptimistic(
    displayAdditionals,
    (
      state: TCartAdditional[],
      { id, type }: { id: number; type: "decrease" | "increase" },
    ): TCartAdditional[] =>
      state.map(
        (item: TCartAdditional): TCartAdditional =>
          item.id !== id
            ? item
            : {
                ...item,
                quantity: type === "increase" ? item.quantity + 1 : Math.max(0, item.quantity - 1),
                totalPrice:
                  type === "increase" ? item.totalPrice + item.price : item.totalPrice - item.price,
              },
      ),
  );

  const handleUpdate = (id: number, type: "decrease" | "increase"): void => {
    startTransition(async (): Promise<void> => {
      optimisticUpdate({ id, type });
      await updateAdditionalQuantity(id, type);
    });
  };

  return (
    <div className={wrapperClass}>
      {!!additionals.length && (
        <>
          <p>{t<string>("priceIncluded")}</p>

          <div className={listClass}>
            {optimisticAdditionals.map<React.ReactElement>(
              ({ id, ...rest }: TCartAdditional): React.ReactElement => (
                <AdditionalRow
                  key={`cart-additional-${id}`}
                  onUpdate={(type: "decrease" | "increase"): void => handleUpdate(id, type)}
                  {...{ id, ...rest }}
                />
              ),
            )}
          </div>
        </>
      )}
    </div>
  );
};

export { Additionals };

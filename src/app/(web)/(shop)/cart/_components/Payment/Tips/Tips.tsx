"use client";
import React, { useState } from "react";

import { updateTips } from "@/app/(web)/_actions";
import { useTranslation } from "@/hooks";
import { Checkbox } from "@/ui";

import { descriptionClass, rowClass, titleClass, wrapperClass } from "./Tips.css";

import type { TProps } from "./Tips.types";

const tipPercentages: number[] = [2, 5, 10, 15];

const Tips: React.FC<TProps> = ({ tips }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number>(tips.percentage);

  const handleChange = (
    amount: number,
    { currentTarget }: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const next = currentTarget.checked ? amount : 0;

    setSelected(next);

    const formData = new FormData();

    formData.set("tips", `${next}`);
    updateTips(formData);
  };

  return (
    <div className={wrapperClass}>
      <h2 className={titleClass}>Tips</h2>
      <p className={descriptionClass}>{t<string>("tipsDescription")}</p>

      <div className={rowClass}>
        {tipPercentages.map<React.ReactElement>((amount: number) => {
          const tipId = `cart-tip-${amount}`;

          return (
            <Checkbox
              bold
              checked={amount === selected}
              id={tipId}
              key={tipId}
              label={`${amount}%`}
              name="tips"
              onChange={(event) => handleChange(amount, event)}
              type="checkbox"
              value={amount}
            />
          );
        })}
      </div>
    </div>
  );
};

export { Tips };

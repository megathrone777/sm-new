"use client";
import React, { useState } from "react";

import { useTranslation } from "@/hooks";
import { Checkbox } from "@/ui";

import {
  layoutClass,
  priceClass,
  priceHolderClass,
  subListClass,
  subModifiersClass,
  subModifiersLayoutClass,
  wrapperClass,
} from "./Modifiers.css";

import type { TProps } from "./Modifiers.types";

const Modifiers: React.FC<TProps> = ({ modifiers, requiredModifier }) => {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const { t } = useTranslation();

  const handleModifierChange = (id: number, checked: boolean): void => {
    if (requiredModifier) {
      setCheckedIds(checked ? [id] : []);
    } else {
      setCheckedIds((prevIds: number[]): number[] =>
        checked ? [...prevIds, id] : prevIds.filter((prevId: number): boolean => prevId !== id),
      );
    }
  };

  return (
    <div className={wrapperClass[modifiers.length > 8 ? "2" : "1"]}>
      {modifiers.map((modifier: TModifier): React.ReactElement => {
        const { id, price, subModifiers, title } = modifier;
        const isChecked = checkedIds.includes(id);

        return (
          <div
            className={layoutClass}
            key={`${id}-modifier-item`}
          >
            <Checkbox
              label={
                <>
                  {title}
                  {price !== 0 && (
                    <span className={priceHolderClass}>
                      {" "}
                      +{" "}
                      <span className={priceClass}>
                        {price} {t<string>("currency")}
                      </span>
                    </span>
                  )}
                </>
              }
              name="modifier"
              onChange={({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
                handleModifierChange(id, currentTarget.checked);
              }}
              type={requiredModifier ? "radio" : "checkbox"}
              value={id}
            />

            {subModifiers && !!subModifiers.length && (
              <div className={subModifiersClass}>
                <div className={subModifiersLayoutClass}>
                  <ul
                    className={subListClass}
                    key={`${isChecked}-sub-list-${id}`}
                  >
                    {subModifiers.map(
                      ({ id: subModifierId, title }: TSubmodifier): React.ReactElement => (
                        <li key={`${subModifierId}-${id}-submodifier`}>
                          <Checkbox
                            className="is-small"
                            label={title}
                            name={`${id}-submodifier`}
                            template="small"
                            type="radio"
                            value={subModifierId}
                          />
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { Modifiers };

"use client";
import React, { useState } from "react";

import { Selectbox } from "@/ui";

import { wrapperClass } from "./CategorySelect.css";

import type { TProps } from "./CategorySelect.types";

const CategorySelect: React.FC<TProps> = ({
  defaultValue,
  label,
  onChange,
  options,
  placeholder,
}) => {
  const [categoryId, setCategoryId] = useState<number>(defaultValue);

  const handleChange = (value: number): void => {
    setCategoryId(+value);
    onChange?.(+value);
  };

  return (
    <div className={wrapperClass}>
      <input
        name="categoryId"
        type="hidden"
        value={categoryId}
      />

      <Selectbox
        {...{ label, options, placeholder }}
        defaultValue={defaultValue ? `${defaultValue}` : undefined}
        onChange={handleChange}
      />
    </div>
  );
};

export { CategorySelect };

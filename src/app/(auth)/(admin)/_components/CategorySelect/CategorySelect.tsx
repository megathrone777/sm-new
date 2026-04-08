"use client";
import React, { useState } from "react";

import { Selectbox } from "@/ui";

import { wrapperClass } from "./CategorySelect.css";

interface TProps {
  defaultValue: number;
  onChange?: (value: number) => void;
  options: TSelectOption[];
  placeholder?: string;
}

const CategorySelect: React.FC<TProps> = ({ defaultValue, onChange, options, placeholder }) => {
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
        {...{ options, placeholder }}
        defaultValue={defaultValue ? `${defaultValue}` : undefined}
        onChange={handleChange}
      />
    </div>
  );
};

export { CategorySelect };

"use client";
import React, { useState } from "react";

import { Selectbox } from "@/ui";

interface TProps {
  defaultValue: number;
  options: TSelectOption[];
}

const CategorySelect: React.FC<TProps> = ({ defaultValue, options }) => {
  const [categoryId, setCategoryId] = useState<number>(defaultValue);

  const handleChange = (value: number): void => {
    setCategoryId(+value);
  };

  return (
    <>
      <input
        name="categoryId"
        type="hidden"
        value={categoryId}
      />

      <Selectbox
        {...{ options }}
        defaultValue={`${defaultValue}`}
        label="Category"
        onChange={handleChange}
      />
    </>
  );
};

export { CategorySelect };

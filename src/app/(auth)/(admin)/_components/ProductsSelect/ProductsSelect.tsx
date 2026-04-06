"use client";
import React, { useState } from "react";

import { Selectbox } from "@/ui";

import type { TProps } from "./ProductsSelect.types";

const ProductsSelect: React.FC<TProps> = ({ defaultValue, options }) => {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  return (
    <>
      {selected.map(
        (slug: string): React.ReactElement => (
          <input
            key={slug}
            name="productSlugs"
            type="hidden"
            value={slug}
          />
        ),
      )}

      <Selectbox
        {...{ defaultValue, options }}
        label="Products"
        mode="multiple"
        onChange={setSelected}
      />
    </>
  );
};

export { ProductsSelect };

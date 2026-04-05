"use client";
import React, { useState } from "react";

import { Selectbox } from "@/ui";

import type { TProps } from "./ProductsSelect.types";

const ProductsSelect: React.FC<TProps> = ({ defaultValue, options }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      {/* {selected.map(
        (id: string): React.ReactElement => (
          <input
            key={id}
            name="subModifierIds"
            type="hidden"
            value={id}
          />
        ),
      )} */}

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

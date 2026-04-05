"use client";
import React, { useState } from "react";

import { Selectbox } from "@/ui";

import type { TProps } from "./SubModifiersSelect.types";

const SubModifiersSelect: React.FC<TProps> = ({ defaultValue, options }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      {selected.map(
        (id: string): React.ReactElement => (
          <input
            key={id}
            name="subModifierIds"
            type="hidden"
            value={id}
          />
        ),
      )}

      <Selectbox
        {...{ defaultValue, options }}
        label="SubModifiers"
        mode="multiple"
        onChange={setSelected}
      />
    </>
  );
};

export { SubModifiersSelect };

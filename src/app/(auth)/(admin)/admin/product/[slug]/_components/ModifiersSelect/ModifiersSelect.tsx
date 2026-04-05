"use client";
import React, { useState } from "react";

import { Selectbox } from "@/ui";

import type { TProps } from "./ModifiersSelect.types";

const ModifiersSelect: React.FC<TProps> = ({ defaultValue, options }) => {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  return (
    <>
      {selected.map(
        (id: string): React.ReactElement => (
          <input
            key={id}
            name="modifierIds"
            type="hidden"
            value={id}
          />
        ),
      )}

      <Selectbox
        {...{ defaultValue, options }}
        label="Modifiers"
        mode="multiple"
        onChange={setSelected}
      />
    </>
  );
};

export { ModifiersSelect };

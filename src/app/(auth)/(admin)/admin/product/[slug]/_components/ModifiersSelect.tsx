"use client";
import React, { useState } from "react";
import Select from "@rc-component/select";

interface TProps {
  defaultValue: string[];
  options: { label: string; value: string }[];
}

const ModifiersSelect: React.FC<TProps> = ({ defaultValue, options }) => {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  return (
    <>
      {selected.map((id) => (
        <input
          key={id}
          name="modifierIds"
          type="hidden"
          value={id}
        />
      ))}

      <Select
        defaultValue={defaultValue}
        maxTagCount={2}
        mode="multiple"
        onChange={setSelected}
        options={options}
        style={{ width: "100%" }}
      />
    </>
  );
};

export { ModifiersSelect };

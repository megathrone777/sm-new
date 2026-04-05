"use client";
import React, { useState } from "react";

import { Selectbox } from "@/ui";

import type { TProps } from "./RoleSelect.types";

const RoleSelect: React.FC<TProps> = ({ defaultValue, options }) => {
  const [role, setRole] = useState<TUserRole>(defaultValue);

  return (
    <>
      <input
        name="role"
        type="hidden"
        value={role}
      />

      <Selectbox
        {...{ defaultValue, options }}
        label="Role"
        onChange={setRole}
      />
    </>
  );
};

export { RoleSelect };

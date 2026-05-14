"use client";
import React, { startTransition, useState } from "react";
import { toast } from "react-toastify";

import { setShopAvailable } from "@/app/(auth)/(admin)/_actions";
import { Checkbox } from "@/ui";

import type { TProps } from "./AvailabilityToggle.types";

const AvailabilityToggle: React.FC<TProps> = ({ initialValue }) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(initialValue);

  const handleChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>): void => {
    const next = currentTarget.checked;

    setIsAvailable(next);
    startTransition(async (): Promise<void> => {
      const { message, type } = await setShopAvailable(next);

      toast(message, { type });
    });
  };

  return (
    <Checkbox
      checked={isAvailable}
      label="Shop is available"
      name="isAvailable"
      onChange={handleChange}
      type="checkbox"
    />
  );
};

export { AvailabilityToggle };

"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { CategorySelect } from "@/app/(auth)/(admin)/_components";

interface TProps {
  options: TSelectOption[];
}

const CategoryFilter: React.FC<TProps> = ({ options }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: number): void => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("categoryId", `${value}`);
    } else {
      params.delete("categoryId");
    }

    router.replace(`/admin/products?${params.toString()}`);
  };

  const categoryId = Number(searchParams.get("categoryId")) || 0;

  return (
    <CategorySelect
      {...{ options }}
      defaultValue={categoryId}
      onChange={handleChange}
      placeholder="All categories"
    />
  );
};

export { CategoryFilter };

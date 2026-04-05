"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { deleteProduct } from "@/app/(auth)/(admin)/_actions";
import { DeleteAlert } from "@/app/(auth)/_components";

import type { TProps } from "./ListLayout.types";

const ListLayout: React.FC<TProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const deleteId = searchParams.get("deleteId");
  const deleteTitle = searchParams.get("deleteTitle");

  return (
    <>
      {deleteId && (
        <DeleteAlert
          {...{ deleteId, deleteTitle }}
          action={deleteProduct}
          href="/admin/products"
        />
      )}

      {children}
    </>
  );
};

export { ListLayout };

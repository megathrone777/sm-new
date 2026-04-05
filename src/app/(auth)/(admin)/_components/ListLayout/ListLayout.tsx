"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { DeleteAlert } from "@/app/(auth)/_components";

import type { TProps } from "./ListLayout.types";

const ListLayout: React.FC<TProps> = ({ children, deleteAction, href }) => {
  const searchParams = useSearchParams();
  const deleteId = searchParams.get("deleteId");
  const deleteTitle = searchParams.get("deleteTitle");

  return (
    <>
      {deleteId && (
        <DeleteAlert
          {...{ deleteId, deleteTitle, href }}
          action={deleteAction}
        />
      )}

      {children}
    </>
  );
};

export { ListLayout };

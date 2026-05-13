"use client";
import React, { useTransition } from "react";
import moment from "moment";

import { deleteOrder } from "@/app/(auth)/(admin)/_actions";

import { contentClass, deleteButtonClass, titleClass, wrapperClass } from "./Heading.css";

import type { TProps } from "./Heading.types";

const Heading: React.FC<TProps> = ({ createdAt, id, isAdmin, onDelete, ordersCount, status }) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = (): void => {
    if (!confirm("Вы действительно хотите удалить заказ?")) return;

    const formData = new FormData();

    formData.set("id", `${id}`);

    startTransition(async (): Promise<void> => {
      const result = await deleteOrder(null, formData);

      if (result?.type === "success") onDelete(id);
    });
  };

  return (
    <div className={wrapperClass}>
      <h3 className={titleClass}>
        №{id} {status !== "done" && <span>({status})</span>}{" "}
        {ordersCount > 0 && <>({ordersCount})</>}
      </h3>

      <div className={contentClass}>
        <span>{moment(createdAt).format("HH:mm")}</span>

        {isAdmin && (
          <button
            className={deleteButtonClass}
            disabled={isPending}
            onClick={handleDeleteClick}
            type="button"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export { Heading };

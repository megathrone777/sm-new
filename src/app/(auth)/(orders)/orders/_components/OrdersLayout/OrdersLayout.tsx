"use client";
import React, { useState } from "react";

import { useNewOrderAlert, useRealtime } from "@/hooks";

import { Item } from "../Item";

import { listClass } from "./OrdersLayout.css";

import type { TProps } from "./OrdersLayout.types";

const OrdersLayout: React.FC<TProps> = ({ initialOrders, isAdmin, placeholder }) => {
  const [orders, setOrders] = useState<TOrder[]>(initialOrders);
  const { notify } = useNewOrderAlert();

  useRealtime({
    events: ["newOrder", "orderStatusChanged"],
    onData: ({ data, event }): void => {
      if (event === "newOrder") {
        if (!data?.order) return;

        setOrders((prev: TOrder[]): TOrder[] => [data.order, ...prev]);
        notify(data.id);

        return;
      }

      if (event === "orderStatusChanged") {
        setOrders((prev: TOrder[]): TOrder[] =>
          prev.map(
            (order: TOrder): TOrder =>
              order.id === data.id ? { ...order, status: data.status } : order,
          ),
        );
      }
    },
  });

  const handleDelete = (deletedId: number): void => {
    setOrders((prev: TOrder[]): TOrder[] =>
      prev.filter((order: TOrder): boolean => order.id !== deletedId),
    );
  };

  return (
    <>
      {orders.length > 0 ? (
        <div className={listClass}>
          {orders.map<React.ReactElement>((order: TOrder) => (
            <Item
              key={`${order.id}-order-${order.status}`}
              {...order}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        placeholder
      )}
    </>
  );
};

export { OrdersLayout };

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
    events: ["newOrder"],
    onData: ({ data }): void => {
      if (!data?.order) return;

      setOrders((prev: TOrder[]): TOrder[] => [data.order, ...prev]);
      notify(data.id);
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

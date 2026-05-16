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
        setOrders((prevOrders: TOrder[]): TOrder[] => [data.order, ...prevOrders]);
        notify(data.id);

        return;
      }

      if (event === "orderStatusChanged") {
        setOrders((prevOrders: TOrder[]): TOrder[] =>
          prevOrders.map<TOrder>((prevOrder: TOrder) =>
            prevOrder.id === data.id ? { ...prevOrder, status: data.status } : prevOrder,
          ),
        );
      }
    },
  });

  const handleDelete = (deletedId: number): void => {
    setOrders((prevOrders: TOrder[]): TOrder[] =>
      prevOrders.filter((prevOrder: TOrder): boolean => prevOrder.id !== deletedId),
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
              {...{ isAdmin }}
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

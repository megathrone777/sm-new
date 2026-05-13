"use client";
import React, { useState } from "react";

import { useNewOrderAlert, useRealtime } from "@/hooks";

import { Item } from "../Item";
import { Placeholder } from "../Placeholder";

import { listClass, wrapperClass } from "../../page.css";

import type { TProps } from "./OrdersLayout.types";

// TODO: pass children
const OrdersLayout: React.FC<TProps> = ({ initialOrders }) => {
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

  return (
    <div className={wrapperClass}>
      {orders.length > 0 ? (
        <div className={listClass}>
          {orders.map<React.ReactElement>((order: TOrder) => (
            <Item
              key={`${order.id}-order-${order.status}`}
              {...order}
            />
          ))}
        </div>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export { OrdersLayout };

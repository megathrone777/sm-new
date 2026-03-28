"use client";
import React, { useState } from "react";

import { useRealtime } from "@/hooks";

import type { TProps } from "./Orders.types";

const Orders: React.FC<TProps> = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState<TOrder[]>(initialOrders);

  useRealtime({
    events: ["notification.newOrder"],
    onData: ({ data, event }) => {
      console.log(`Received ${event}:`, data);

      if (data) {
        setOrders((prevOrders: TOrder[]): TOrder[] => [...prevOrders, data]);
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
      }}
    >
      {orders.map(
        ({ email, price }: TOrder, index: number): React.ReactElement => (
          <div
            key={`${email}-order`}
            style={{
              borderBottom: "3px solid black",
              display: "flex",
              flexDirection: "column",
              padding: 4,
              rowGap: 5,
            }}
          >
            <span>Order #{index}</span>
            <span>{email}</span>
            <span>{price}CZK</span>
          </div>
        ),
      )}
    </div>
  );
};

export { Orders };

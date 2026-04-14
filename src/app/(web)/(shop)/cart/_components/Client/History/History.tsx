import React from "react";

import { ordersHelpers } from "@/helpers/orders";
import { Button } from "@/ui";

import type { TProps } from "./History.types";

const History: React.FC<TProps> = async ({ phoneNumber }) => {
  if (!phoneNumber) return null;
  if (!phoneNumber.match(/^\+\d{7,15}$/)) return null;
  const orders = await ordersHelpers.getOrdersByPhone(phoneNumber.replace("+", ""), 0, 100);

  if (orders && !!orders.length) {
    return (
      <Button
        href={
          `/archived-orders/${phoneNumber.replace("+", "")}` as __next_route_internal_types__.RouteImpl<string>
        }
        iconId="history"
        template="small"
        title="Archivní objednávky"
      />
    );
  }

  return null;
};

export { History };

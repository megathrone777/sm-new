import React from "react";

import { store } from "@/store";
import { Button } from "@/ui";

import type { TProps } from "./History.types";

const History: React.FC<TProps> = async ({ phoneNumber }) => {
  if (!phoneNumber) return null;
  if (!/^\d{7,15}$/.test(phoneNumber)) return null;
  const orders = await store.orders.getByPhone(phoneNumber, 0, 100);

  if (orders && !!orders.length) {
    return (
      <Button
        href={{
          pathname: "/archived-orders/[phoneNumber]",
          query: {
            phoneNumber,
          },
        }}
        iconId="history"
        template="small"
        title="Historie objednavek"
      />
    );
  }

  return null;
};

export { History };

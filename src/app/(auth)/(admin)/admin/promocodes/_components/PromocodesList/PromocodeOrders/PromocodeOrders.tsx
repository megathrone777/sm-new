import React from "react";

import { getTranslation } from "@/dictionaries";
import { store } from "@/store";

import { wrapperClass } from "./PromocodeOrders.css";

const PromocodeOrders: React.FC<{ code: string }> = async ({ code }) => {
  const orders = await store.orders.getByPromocode(code);

  if (!orders.length) return null;

  return (
    <div className={wrapperClass}>
      Orders using {code} ({orders.length}):&nbsp;
      {orders.map<React.ReactElement>(
        ({ clientPhoneNumber, createdAt, id, totalPrice }: TOrder) => (
          <span key={`promo-order-${id}`}>
            #{id} ({clientPhoneNumber}, {totalPrice} {getTranslation<string>("currency")},{" "}
            {new Date(createdAt).toLocaleDateString()}
            )&nbsp;
          </span>
        ),
      )}
    </div>
  );
};

export { PromocodeOrders };

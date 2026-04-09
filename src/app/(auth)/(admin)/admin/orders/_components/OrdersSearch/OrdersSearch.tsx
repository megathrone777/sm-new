"use client";
import React from "react";
import Link from "next/link";

import { searchOrders } from "@/app/(auth)/(admin)/_actions";
import { Search } from "@/app/(auth)/_components";

import { infoClass, listClass } from "./OrdersSearch.css";

const OrdersSearch: React.FC = () => (
  <Search<TOrder> searchAction={searchOrders}>
    {(results): React.ReactElement => (
      <ul className={listClass}>
        {results.map<React.ReactElement>(({ clientEmail, id, totalPrice }: TOrder) => (
          <li
            className={infoClass}
            key={`search-order-item-${id}`}
          >
            <Link href={`/admin/order/${id}`}>
              <span>Order: #{id}</span>
              <span>{clientEmail}</span>
              <span>{totalPrice} CZK</span>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </Search>
);

export { OrdersSearch };

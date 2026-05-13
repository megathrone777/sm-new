import React from "react";

import { store } from "@/store";

import { OrdersLayout, Placeholder } from "./_components";

import { wrapperClass } from "./page.css";

const Page: React.FC<PageProps<"/orders">> = async () => {
  const [initialOrders, session] = await Promise.all([
    store.orders.getActive(),
    store.sessions.get(),
  ]);
  const isAdmin = session?.role === "admin";

  return (
    <div className={wrapperClass}>
      <OrdersLayout
        {...{ initialOrders, isAdmin }}
        placeholder={<Placeholder />}
      />
    </div>
  );
};

export default Page;

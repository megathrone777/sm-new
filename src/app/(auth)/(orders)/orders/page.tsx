import React from "react";

import { store } from "@/store";

import { OrdersLayout, Placeholder } from "./_components";

const Page: React.FC<PageProps<"/orders">> = async () => {
  const [initialOrders, session] = await Promise.all([
    store.orders.getActive(),
    store.sessions.get(),
  ]);
  const isAdmin = session?.role === "admin";

  return (
    <OrdersLayout
      {...{ initialOrders, isAdmin }}
      placeholder={<Placeholder />}
    />
  );
};

export default Page;

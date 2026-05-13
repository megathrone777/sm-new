import React from "react";

import { store } from "@/store";

import { OrdersLayout } from "./_components";

const Page: React.FC<PageProps<"/orders">> = async () => {
  const initialOrders = await store.orders.getActive();

  return <OrdersLayout {...{ initialOrders }} />;
};

export default Page;

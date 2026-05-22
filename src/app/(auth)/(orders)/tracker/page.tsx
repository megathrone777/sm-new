import React from "react";

import { store } from "@/store";

import { Overlay } from "./_components";

const Page: React.FC = async () => {
  const initialOrders = await store.orders.getActive();

  return <Overlay {...{ initialOrders }} />;
};

export default Page;

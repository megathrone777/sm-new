import React from "react";

import { ordersHelpers } from "@/helpers/orders";

import { Orders } from "./_components";

const Page: React.FC<PageProps<"/orders">> = async () => {
  const orders = await ordersHelpers.getOrders();

  return (
    <div>
      <h1>Orders page</h1>
      {orders && !!orders.length && <Orders {...{ orders }} />}
    </div>
  );
};

export default Page;

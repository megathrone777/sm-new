import React from "react";

import { getOrders } from "@/helpers";

import { Orders } from "./_components";

const Page: React.FC = async () => {
  const orders = await getOrders();

  return (
    <div>
      <h1>Orders page</h1>
      {orders && !!orders.length && <Orders {...{ orders }} />}
    </div>
  );
};

export default Page;

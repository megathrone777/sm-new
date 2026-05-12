import React from "react";

import { store } from "@/store";

import { Orders } from "./_components";

const Page: React.FC<PageProps<"/orders">> = async () => {
  const orders = await store.orders.getAll();

  return (
    <div>
      <h1>Orders page</h1>
      {orders && !!orders.length && <Orders {...{ orders }} />}
    </div>
  );
};

export default Page;

import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { OrdersList, OrdersSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/orders">> = async () => (
  <>
    <Header title="Orders">
      <OrdersSearch />
    </Header>

    <Suspense>
      <OrdersList />
    </Suspense>
  </>
);

export default Page;

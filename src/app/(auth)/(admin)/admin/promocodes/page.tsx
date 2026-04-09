import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreatePromocode, PromocodesList } from "./_components";

const Page: React.FC = async () => (
  <>
    <Header title="Promocodes" />
    <CreatePromocode />

    <Suspense>
      <PromocodesList />
    </Suspense>
  </>
);

export default Page;

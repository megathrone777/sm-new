import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateDeliveryCondition, DeliveryConditionsList } from "./_components";

const Page: React.FC = async () => (
  <>
    <Header title="Delivery conditions" />
    <CreateDeliveryCondition />

    <Suspense>
      <DeliveryConditionsList />
    </Suspense>
  </>
);

export default Page;

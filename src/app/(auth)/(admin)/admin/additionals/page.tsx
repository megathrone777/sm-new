import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { AdditionalsList, CreateAdditional } from "./_components";

const Page: React.FC<PageProps<"/admin/additionals">> = async () => (
  <>
    <Header title="Additionals" />
    <CreateAdditional />

    <Suspense>
      <AdditionalsList />
    </Suspense>
  </>
);

export default Page;

import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { AdditionalsList, CreateAdditional } from "./_components";

const Page: React.FC<PageProps<"/admin/additionals">> = () => (
  <>
    <Header title="Additionals" />
    <CreateAdditional />

    <Suspense>
      <AdditionalsList />
    </Suspense>
  </>
);

export { metadata } from "./metadata";
export default Page;

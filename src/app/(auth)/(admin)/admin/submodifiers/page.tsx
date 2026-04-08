import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateSubModifier, SubModifiersList } from "./_components";

const Page: React.FC<PageProps<"/admin/submodifiers">> = async () => (
  <>
    <Header title="SubModifiers" />
    <CreateSubModifier />

    <Suspense>
      <SubModifiersList />
    </Suspense>
  </>
);

export default Page;

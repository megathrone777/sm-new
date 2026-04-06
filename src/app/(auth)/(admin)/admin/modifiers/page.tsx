import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateModifier, ModifiersList, ModifiersSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/modifiers">> = async () => (
  <>
    <Header title="Modifiers">
      <ModifiersSearch />
    </Header>

    <CreateModifier />

    <Suspense>
      <ModifiersList />
    </Suspense>
  </>
);

export default Page;

import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { ClientsList, ClientsSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/clients">> = async () => (
  <>
    <Header title="Clients">
      <ClientsSearch />
    </Header>

    <Suspense>
      <ClientsList />
    </Suspense>
  </>
);

export default Page;

import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateUser, UsersList } from "./_components";

const Page: React.FC<PageProps<"/admin/users">> = () => (
  <>
    <Header title="Users" />
    <CreateUser />

    <Suspense>
      <UsersList />
    </Suspense>
  </>
);

export default Page;

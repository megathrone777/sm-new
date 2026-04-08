import React from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateCategory } from "./_components";

const Page: React.FC<PageProps<"/admin/category/create">> = async () => (
  <>
    <Header title="Create category" />
    <CreateCategory />
  </>
);

export default Page;

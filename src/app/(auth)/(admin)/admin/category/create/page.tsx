import React from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateCategory } from "./_components";

const Page: React.FC<PageProps<"/admin/category/create">> = () => (
  <>
    <Header title="Create category" />
    <CreateCategory />
  </>
);

export default Page;

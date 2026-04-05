import React from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateCategory } from "./_components";

const Page: React.FC = () => (
  <>
    <Header title="Categories" />
    <CreateCategory />
  </>
);

export default Page;

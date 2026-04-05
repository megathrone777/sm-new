import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { ProductsList, ProductsSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/products">> = () => (
  <>
    <Header title="Products">
      <ProductsSearch />
    </Header>

    <Suspense>
      <ProductsList />
    </Suspense>
  </>
);

export { metadata } from "./metadata";
export default Page;

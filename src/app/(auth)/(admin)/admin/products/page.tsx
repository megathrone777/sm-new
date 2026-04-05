import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { ListLayout, ProductsList, ProductsSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/products">> = async () => (
  <>
    <Header title="Products">
      <ProductsSearch />
    </Header>

    <Suspense>
      <ListLayout>
        <ProductsList />
      </ListLayout>
    </Suspense>
  </>
);

export { metadata } from "./metadata";
export default Page;

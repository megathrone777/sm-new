import React, { Suspense } from "react";
import Link from "next/link";

import { Header } from "@/app/(auth)/(admin)/_components";
import { Button } from "@/ui";

import { ProductsList, ProductsSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/products">> = () => (
  <>
    <Header title="Products">
      <ProductsSearch />

      <Link href="/admin/product/create">
        <Button
          iconId="plus"
          template="small"
        />
      </Link>
    </Header>

    <Suspense>
      <ProductsList />
    </Suspense>
  </>
);

export { metadata } from "./metadata";
export default Page;

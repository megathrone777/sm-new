import React, { Suspense } from "react";
import Link from "next/link";

import { Header } from "@/app/(auth)/(admin)/_components";
import { store } from "@/store";
import { Button } from "@/ui";

import { CategoryFilter, ProductsList, ProductsSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/products">> = async ({ searchParams }) => {
  const { categoryId } = await searchParams;
  const categories = await store.categories.getAll();
  const options: TSelectOption[] = [
    { label: "All categories", value: "" },
    ...categories
      .filter(({ sortOrder }): boolean => sortOrder !== 0)
      .map<TSelectOption>(({ id, title }) => ({ label: title, value: `${id}` })),
  ];

  return (
    <>
      <Header title="Products">
        <CategoryFilter {...{ options }} />
        <ProductsSearch />

        <Link href="/admin/product/create">
          <Button
            iconId="plus"
            template="small"
          />
        </Link>
      </Header>

      <Suspense>
        <ProductsList {...{ categoryId }} />
      </Suspense>
    </>
  );
};

export default Page;

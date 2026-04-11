import React, { Suspense } from "react";
import Link from "next/link";

import { Header } from "@/app/(auth)/(admin)/_components";
import { productsHelpers } from "@/helpers/products";
import { Button } from "@/ui";

import { CategoryFilter, ProductsList, ProductsSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/products">> = async ({ searchParams }) => {
  const { categoryId: categoryIdParam } = await searchParams;
  const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined;

  const categories = await productsHelpers.getCategories();
  const options: TSelectOption[] = [
    { label: "All categories", value: "" },
    ...categories
      .filter(({ sortOrder }): boolean => sortOrder !== 0)
      .map(({ id, title }): TSelectOption => ({ label: title, value: `${id}` })),
  ];

  return (
    <>
      <Header title="Products">
        <CategoryFilter options={options} />
        <ProductsSearch />

        <Link href="/admin/product/create">
          <Button
            iconId="plus"
            template="small"
          />
        </Link>
      </Header>

      <Suspense>
        <ProductsList categoryId={categoryId} />
      </Suspense>
    </>
  );
};

export default Page;

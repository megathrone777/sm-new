import React from "react";

import { deleteProduct } from "@/app/(auth)/(admin)/_actions";
import { Header } from "@/app/(auth)/(admin)/_components";
import { DeleteAlert, SuccessAlert } from "@/app/(auth)/_components";

import { ProductsList, ProductsSearch } from "./_components";

const Page: React.FC<PageProps<"/admin/products">> = async ({ searchParams }) => {
  const { deleted, deleteId, deleteTitle } = await searchParams;

  return (
    <>
      {deleted && <SuccessAlert title={`&ldquo;${deleted}&rdquo; deleted successfully.`} />}

      {deleteId && (
        <DeleteAlert
          {...{ deleteId, deleteTitle }}
          action={deleteProduct}
          href="/admin/products"
        />
      )}

      <Header title="Products">
        <ProductsSearch />
      </Header>

      <ProductsList />
    </>
  );
};

export { metadata } from "./metadata";
export default Page;

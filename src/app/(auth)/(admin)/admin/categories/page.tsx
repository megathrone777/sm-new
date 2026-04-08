import React, { Suspense } from "react";
import Link from "next/link";

import { Header } from "@/app/(auth)/(admin)/_components";
import { Button } from "@/ui";

import { CategoriesList } from "./_components";

const Page: React.FC<PageProps<"/admin/categories">> = async () => (
  <>
    <Header title="Categories">
      <Link href="/admin/category/create">
        <Button
          iconId="plus"
          template="small"
        />
      </Link>
    </Header>

    <Suspense>
      <CategoriesList />
    </Suspense>
  </>
);

export default Page;

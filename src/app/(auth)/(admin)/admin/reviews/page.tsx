import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateReview, ReviewsList } from "./_components";

const Page: React.FC = async () => (
  <>
    <Header title="Reviews" />
    <CreateReview />

    <Suspense>
      <ReviewsList />
    </Suspense>
  </>
);

export default Page;
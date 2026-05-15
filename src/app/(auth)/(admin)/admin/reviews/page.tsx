import React, { Suspense } from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

import { CreateReview, ReviewsList } from "./_components";

import { layoutClass } from "./page.css";

const Page: React.FC = async () => (
  <>
    <Header title="Reviews" />

    <div className={layoutClass}>
      <CreateReview />

      <Suspense>
        <ReviewsList />
      </Suspense>
    </div>
  </>
);

export default Page;

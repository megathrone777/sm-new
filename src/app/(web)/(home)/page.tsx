import React from "react";

import { Products } from "@/app/(web)/_components";

import { About, AdditionalInfo, Promotion, Reviews, Schedule } from "./_components";

const Page: React.FC<PageProps<"/">> = async () => (
  <>
    <Schedule />
    <About />
    <Promotion />
    <Products title="Menu" />
    <AdditionalInfo />
    <Reviews />
  </>
);

export default Page;

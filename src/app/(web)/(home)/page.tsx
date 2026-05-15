import React from "react";

import { Products } from "@/app/(web)/_components";

import { About, Reviews } from "./_components";

const Page: React.FC<PageProps<"/">> = () => (
  <>
    <About />
    <Products title="Menu" />
    <Reviews />
  </>
);

export default Page;

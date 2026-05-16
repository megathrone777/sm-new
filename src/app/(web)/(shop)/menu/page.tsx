import React from "react";

import { Products } from "@/app/(web)/_components";

const Page: React.FC<PageProps<"/menu">> = () => (
  <>
    <Products
      showAll
      title="Menu"
    />
  </>
);

export { metadata } from "./metadata";
export default Page;

import React from "react";

import { Details, Map } from "./_components";

const Page: React.FC<PageProps<"/contacts">> = () => (
  <>
    <Details />
    <Map />
  </>
);

export { metadata } from "./metadata";
export default Page;

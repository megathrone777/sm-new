import React from "react";

import { Header } from "@/app/(auth)/(admin)/_components";

const Page: React.FC<PageProps<"/admin/settings">> = async () => {
  return (
    <>
      <Header title="Settings" />
    </>
  );
};

export default Page;

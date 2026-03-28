import React from "react";

import { Error } from "@/components";

const NotFoundPage: React.FC = async () => {
  // const [banner] = await useRequest<[TBanner]>(["landing-intro"]);

  return (
    <>
      {/* <Banner {...banner} /> */}
      <Error title="Stránka nenalezena" />
    </>
  );
};

export default NotFoundPage;

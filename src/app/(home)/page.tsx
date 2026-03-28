import React from "react";

import { wrapperClass } from "./page.css";

const Page: React.FC = async () => {
  return (
    <div className={wrapperClass}>
      Home page
      {/* <Products /> */}
    </div>
  );
};

export default Page;

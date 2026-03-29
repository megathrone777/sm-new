import React from "react";

// import { getCategoriesWithProducts } from "@/helpers";
import { wrapperClass } from "./page.css";

const Page: React.FC = async () => {
  // const categories = await getCategoriesWithProducts();

  // console.log(categories);

  return (
    <div className={wrapperClass}>
      Home page
      {/* <Products /> */}
    </div>
  );
};

export default Page;

import React from "react";

import { getCategoriesWithProducts } from "@/helpers";

import { Products } from "../_components";

import { wrapperClass } from "./page.css";

const Page: React.FC = async () => {
  const categories = await getCategoriesWithProducts();

  return (
    <div className={wrapperClass}>
      <p>Home page</p>
      <Products {...{ categories }} />
      <div id="reviews-section">Reviews</div>
    </div>
  );
};

export default Page;

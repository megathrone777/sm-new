import React from "react";

import { store } from "@/store";

import { CartGrid } from "./_components";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Page: React.FC<PageProps<"/admin/cart-layout">> = async () => {
  const layout = await store.cartLayout.get();

  return <CartGrid initialLayout={layout} />;
};

export default Page;

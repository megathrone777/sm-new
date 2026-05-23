import React from "react";

import { saveCartLayout, saveCartLayoutMobile } from "@/app/(auth)/(admin)/_actions";
import { store } from "@/store";
import { DEFAULT_LAYOUT, DEFAULT_MOBILE_LAYOUT } from "@/store/cartLayout";

import { CartGrid } from "./_components";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Page: React.FC<PageProps<"/admin/cart-layout">> = async () => {
  const [layout, mobileLayout] = await Promise.all([
    store.cartLayout.get(),
    store.cartLayout.getMobile(),
  ]);

  return (
    <>
      <CartGrid
        cols={2}
        defaultLayout={DEFAULT_LAYOUT}
        hint="Drag blocks to rearrange. Changes apply to the desktop and tablet cart."
        initialLayout={layout}
        onSave={saveCartLayout}
        title="Cart Layout — Desktop"
      />

      <CartGrid
        cols={1}
        defaultLayout={DEFAULT_MOBILE_LAYOUT}
        hint="Drag blocks to reorder them top to bottom. Changes apply to the mobile cart."
        initialLayout={mobileLayout}
        onSave={saveCartLayoutMobile}
        title="Cart Layout — Mobile"
      />
    </>
  );
};

export default Page;

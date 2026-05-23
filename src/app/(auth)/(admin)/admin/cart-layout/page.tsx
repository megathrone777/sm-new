import React from "react";

import { saveDesktopLayout, saveMobileLayout } from "@/app/(auth)/(admin)/_actions";
import { store } from "@/store";

import { CartGrid } from "./_components";

import "react-grid-layout/css/styles.css";

const Page: React.FC<PageProps<"/admin/cart-layout">> = async () => {
  const [initialDesktopLayout, initialMobileLayout] = await Promise.all([
    store.cartLayout.get(),
    store.cartLayout.getMobile(),
  ]);
  const { desktopLayout, mobileLayout } = store.cartLayout;

  return (
    <>
      <CartGrid
        cols={2}
        defaultLayout={desktopLayout}
        hint="Drag blocks to rearrange. Changes apply to the desktop and tablet cart."
        initialLayout={initialDesktopLayout}
        onSave={saveDesktopLayout}
        title="Cart Layout — Desktop"
      />

      <CartGrid
        cols={1}
        defaultLayout={mobileLayout}
        hint="Drag blocks to reorder them top to bottom. Changes apply to the mobile cart."
        initialLayout={initialMobileLayout}
        onSave={saveMobileLayout}
        title="Cart Layout — Mobile"
      />
    </>
  );
};

export default Page;

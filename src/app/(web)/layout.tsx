import React from "react";

import { getShopSettings } from "@/helpers";

import { Cart, Header, Schedule } from "./_components";

const Layout: React.FC<LayoutProps<"/">> = async ({ children }) => {
  const { contactItems, isOpened, logoUrl, phone, text, title } = await getShopSettings();

  return (
    <>
      <Header {...{ logoUrl, phone }} />
      {children}
      <Cart />
      <Schedule {...{ contactItems, isOpened, text, title }} />
    </>
  );
};

export default Layout;

import React from "react";

import { shopHelpers } from "@/helpers";

import { Cart, Header, Schedule } from "./_components";

const Layout: React.FC<LayoutProps<"/">> = async ({ children }) => {
  const { contactItems, isOpened, logoUrl, phone, text, title } = await shopHelpers.getSettings();

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

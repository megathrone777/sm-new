import React from "react";

import { authHelpers, shopHelpers } from "@/helpers";

import { Admin, Cart, Header, Schedule } from "./_components";

const Layout: React.FC<LayoutProps<"/">> = async ({ children }) => {
  const authSession = await authHelpers.getSession();
  const { contactItems, isOpened, logoUrl, phone, text, title } = await shopHelpers.getSettings();

  return (
    <>
      <Header {...{ logoUrl, phone }} />
      {children}
      <Cart />
      {authSession && authSession.role === "admin" && <Admin />}
      <Schedule {...{ contactItems, isOpened, text, title }} />
    </>
  );
};

export default Layout;

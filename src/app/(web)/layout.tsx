import React from "react";

import { authHelpers } from "@/helpers/auth";
import { shopHelpers } from "@/helpers/shop";

import { Admin, Cart, Controls, Footer, Header } from "./_components";

const Layout: React.FC<LayoutProps<"/">> = async ({ children }) => {
  const authSession = await authHelpers.getSession();
  const {
    address,
    allergeny,
    allergenyUrl,
    businessName,
    contactItems,
    email,
    isOpened,
    logoUrl,
    navigation,
    phone,
    text,
    title,
  } = await shopHelpers.getSettings();

  return (
    <>
      <Header {...{ logoUrl, navigation, phone }} />
      {children}

      <Footer
        {...{
          address,
          allergeny,
          allergenyUrl,
          businessName,
          contactItems,
          email,
          logoUrl,
          navigation,
          phone,
        }}
      />

      <Cart />
      {authSession && authSession.role === "admin" && <Admin />}
      <Controls {...{ contactItems, isOpened, text, title }} />
    </>
  );
};

export default Layout;

import React from "react";

import { store } from "@/store";
import { isShopOpened } from "@/utils";

import { Admin, Cart, Controls, Footer, Header } from "./_components";

const Layout: React.FC<LayoutProps<"/">> = async ({ children }) => {
  const authSession = await store.sessions.get();
  const {
    address,
    allergenyUrl,
    businessName,
    closedByOverloadText,
    closedByOverloadTitle,
    closedByScheduleText,
    closedByScheduleTitle,
    contactItems,
    email,
    isAvailable,
    logoUrl,
    navigation,
    phone,
    schedule,
    title,
  } = await store.shop.getSettings();
  const scheduleIsOpen = isShopOpened(schedule, true);
  const shopIsOpen = scheduleIsOpen && isAvailable;
  const closedTitle = !scheduleIsOpen ? closedByScheduleTitle : closedByOverloadTitle;
  const closedText = !scheduleIsOpen ? closedByScheduleText : closedByOverloadText;

  return (
    <>
      <Header {...{ logoUrl, navigation, phone }} />
      <main>{children}</main>

      <Footer
        {...{
          address,
          allergenyUrl,
          businessName,
          contactItems,
          email,
          logoUrl,
          navigation,
          phone,
        }}
      />

      {shopIsOpen && <Cart />}
      {authSession && authSession.role === "admin" && <Admin />}

      <Controls
        {...{ closedText, closedTitle, contactItems, title }}
        isOpened={shopIsOpen}
        text={closedByScheduleText}
      />
    </>
  );
};

export default Layout;

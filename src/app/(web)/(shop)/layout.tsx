import React from "react";

import { Scroller } from "@/app/(web)/_components";

import { Hero } from "./_components";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <>
    <Hero />
    <Scroller />
    {children}
  </>
);

export default Layout;

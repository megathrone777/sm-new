import React from "react";

import { Header } from "@/app/(auth)/_components";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;

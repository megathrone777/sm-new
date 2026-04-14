import React from "react";

import { Header } from "@/app/(auth)/_components";
import { RealTime } from "@/components";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <RealTime>
    <Header />
    {children}
  </RealTime>
);

export default Layout;

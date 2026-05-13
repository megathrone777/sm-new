import React from "react";

import { Header } from "@/app/(auth)/_components";
import { RealTime } from "@/components";

import { wrapperClass } from "./layout.css";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <RealTime>
    <div className={wrapperClass}>
      <Header />
      {children}
    </div>
  </RealTime>
);

export default Layout;

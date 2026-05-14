import React from "react";

import { Header } from "@/app/(auth)/_components";
import { Container } from "@/ui";

import { Sidebar } from "./_components";

import { wrapperClass, contentClass, layoutClass } from "./layout.css";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <div className={wrapperClass}>
    <Header />

    <div style={{ height: "100%", minHeight: 400 }}>
      <Container>
        <div className={layoutClass}>
          <Sidebar />
          <div className={contentClass}>{children}</div>
        </div>
      </Container>
    </div>
  </div>
);

export { metadata } from "./metadata";
export default Layout;

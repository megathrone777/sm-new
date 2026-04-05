import React from "react";

import { Header } from "@/app/(auth)/_components";
import { Container } from "@/ui";

import { Sidebar } from "./_components";

import { contentClass, layoutClass } from "./layout.css";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <>
    <Header />

    <Container>
      <div className={layoutClass}>
        <Sidebar />
        <div className={contentClass}>{children}</div>
      </div>
    </Container>
  </>
);

export default Layout;

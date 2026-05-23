import React from "react";

import { Header } from "@/app/(auth)/_components";
import { Container } from "@/ui";

import { AdminBody } from "./_components";

import { wrapperClass } from "./layout.css";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <div className={wrapperClass}>
    <Header />

    <div>
      <Container fluid>
        <AdminBody>{children}</AdminBody>
      </Container>
    </div>
  </div>
);

export { metadata } from "./metadata";
export default Layout;

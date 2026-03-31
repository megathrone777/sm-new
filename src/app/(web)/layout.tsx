import React from "react";

import { Cart, Header } from "./_components";

import type { TProps } from "./layout.types";

const Layout: React.FC<TProps> = ({ children }) => (
  <>
    <Header />
    <div>{children}</div>
    <Cart />
  </>
);

export default Layout;

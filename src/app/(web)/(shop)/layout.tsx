import React from "react";

import { Hero } from "./_components";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <>
    <Hero />
    <div>{children}</div>
  </>
);

export default Layout;

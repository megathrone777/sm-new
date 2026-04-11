import React from "react";

import { Hero } from "./_components";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <>
    <Hero />
    {children}
  </>
);

export default Layout;

import React from "react";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <>
    <h2>Orders layout</h2>
    <div>{children}</div>
  </>
);

export default Layout;

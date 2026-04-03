import React from "react";

const Layout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <>
    <h2>Admin layout</h2>
    <div>{children}</div>
  </>
);

export default Layout;

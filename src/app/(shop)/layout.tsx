import React from "react";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <>
    <h2>Shop layout</h2>
    <div>{children}</div>
  </>
);

export default Layout;

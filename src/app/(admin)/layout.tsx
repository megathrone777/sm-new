import React from "react";

import type { TProps } from "./layout.types";

const Layout: React.FC<TProps> = ({ children }) => (
  <>
    <h2>Admin layout</h2>
    <div>{children}</div>
  </>
);

export default Layout;

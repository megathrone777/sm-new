import React from "react";

import { RealTime } from "@/components";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RealTime>{children}</RealTime>
);

export default Layout;

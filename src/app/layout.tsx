import React from "react";

import "@rc-component/select/assets/index.css";

import { Toasts } from "@/components";
import { themeClass } from "@/theme";
import "@/theme/global";

import { fonts } from "./fonts";

const RootLayout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <html
    className={`${fonts.avenir.variable} ${fonts.franklin.variable} ${fonts.akrobat.variable} ${themeClass}`}
    data-scroll-behavior="smooth"
    lang="cs"
  >
    <body>
      {children}
      <Toasts />
    </body>
  </html>
);

export { metadata } from "./metadata";
export { viewport } from "./viewport";
export default RootLayout;

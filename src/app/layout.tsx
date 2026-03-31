import React from "react";

import { RealTime } from "@/components";
import { themeClass } from "@/theme";
import "@/theme/global";

import { fonts } from "./fonts";

import type { TProps } from "./layout.types";

const RootLayout: React.FC<TProps> = ({ children }) => (
  <html
    className={`${fonts.avenir.variable} ${fonts.franklin.variable} ${fonts.akrobat.variable} ${themeClass}`}
    data-scroll-behavior="smooth"
    lang="cs"
  >
    <body>
      <RealTime>{children}</RealTime>
    </body>
  </html>
);

export { metadata } from "./metadata";
export default RootLayout;

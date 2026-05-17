import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ToastsLoader } from "@/components/Toasts/ToastsLoader";
import { themeClass } from "@/theme";
import "@/theme/global";

import { fonts } from "./fonts";

const RootLayout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <html
    className={`${fonts.avenir.variable} ${fonts.franklin.variable} ${fonts.akrobat.variable} ${themeClass}`}
    lang="cs"
  >
    <body>
      {children}
      <ToastsLoader />
      <SpeedInsights />
    </body>
  </html>
);

export { metadata } from "./metadata";
export { viewport } from "./viewport";
export default RootLayout;

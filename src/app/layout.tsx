import React from "react";
import Link from "next/link";

import { themeClass } from "@/theme";
import "@/theme/global";

import { fonts } from "./fonts";

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <html
    className={`${fonts.avenir.variable} ${fonts.franklin.variable} ${fonts.akrobat.variable} ${themeClass}`}
    lang="cs"
  >
    <body>
      <div>
        <ul style={{ columnGap: 10, display: "flex" }}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
          <li>
            <Link href="/cart">Cart</Link>
          </li>
          <li>
            <Link href="/orders">Orders</Link>
          </li>
        </ul>
      </div>

      {children}
    </body>
  </html>
);

export { metadata } from "./metadata";
export default RootLayout;

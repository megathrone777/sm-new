import { globalStyle as vanillaGlobalStyle } from "@vanilla-extract/css";

import { devices } from "../variables";

import { vars } from "../theme.css";

import type { GlobalStyleArg, ThemeVars } from "./types";

const globalStyle = (selector: string, rule: GlobalStyleArg): void => {
  const themeVars: ThemeVars = { devices, ...vars };

  vanillaGlobalStyle(selector, typeof rule === "function" ? rule(themeVars) : rule);
};

export { globalStyle };

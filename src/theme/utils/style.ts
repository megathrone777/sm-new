import { style as vanillaStyle } from "@vanilla-extract/css";

import { devices } from "../variables";

import { vars } from "../theme.css";

import type { StyleArg, ThemeVars } from "./types";

const resolveStyle = (styleArg: StyleArg, themeVars: ThemeVars): string =>
  vanillaStyle(typeof styleArg === "function" ? styleArg(themeVars) : styleArg);

const style = (arg: StyleArg): string => resolveStyle(arg, { devices, ...vars });

export { style };

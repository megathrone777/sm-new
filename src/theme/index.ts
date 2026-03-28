import { style, type ComplexStyleRule } from "@vanilla-extract/css";

import { vars } from "./theme.css";

export const css = (
  arg: ((themeVars: typeof vars) => ComplexStyleRule) | ComplexStyleRule,
): string => {
  if (typeof arg === "function") {
    return style(arg(vars));
  }

  return style(arg);
};

export { themeClass } from "./theme.css";

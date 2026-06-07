import type { vars } from "../theme.css";

import type { ComplexStyleRule, GlobalStyleRule } from "@vanilla-extract/css";
import type { devices } from "../variables";

export type ThemeVars = typeof vars & {
  devices: typeof devices;
};

export type StyleArg = ((themeVars: ThemeVars) => ComplexStyleRule) | ComplexStyleRule;
export type GlobalStyleArg = ((themeVars: ThemeVars) => GlobalStyleRule) | GlobalStyleRule;

export type StyleVariants = <Map extends Record<string, ComplexStyleRule | string>>(
  variantMap: ((themeVars: ThemeVars) => Map) | Map,
  mapFn: (value: Map[keyof Map], themeVars: ThemeVars) => ComplexStyleRule,
) => Record<keyof Map, string>;

import { style, styleVariants, type ComplexStyleRule } from "@vanilla-extract/css";

import { devices } from "./variables";

import { vars } from "./theme.css";

type ThemeVars = typeof vars & {
  devices: typeof devices;
};

const css = (arg: ((themeVars: ThemeVars) => ComplexStyleRule) | ComplexStyleRule): string => {
  if (typeof arg === "function") {
    return style(
      arg({
        devices,
        ...vars,
      }),
    );
  }

  return style(arg);
};

const cssVariants = <Map extends Record<string, ComplexStyleRule | string>>(
  variantMap: ((themeVars: ThemeVars) => Map) | Map,
  mapFn: (value: Map[keyof Map], themeVars: ThemeVars) => ComplexStyleRule,
): Record<keyof Map, string> => {
  const themeVars: ThemeVars = {
    devices,
    ...vars,
  };
  const resolvedMap = typeof variantMap === "function" ? variantMap(themeVars) : variantMap;

  return styleVariants(resolvedMap, (value) => mapFn(value as Map[keyof Map], themeVars));
};

export { css, cssVariants };
export { themeClass } from "./theme.css";

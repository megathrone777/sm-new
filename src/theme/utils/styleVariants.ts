import { styleVariants as vanillaStyleVariants, type ComplexStyleRule } from "@vanilla-extract/css";

import { devices } from "../variables";

import { vars } from "../theme.css";

import type { StyleVariants, ThemeVars } from "./types";

const styleVariants: StyleVariants = ((variantMap: unknown, mapFn: unknown): unknown => {
  const themeVars: ThemeVars = { devices, ...vars };
  const resolvedMap = (
    typeof variantMap === "function"
      ? (variantMap as (t: ThemeVars) => Record<string, unknown>)(themeVars)
      : variantMap
  ) as Record<string, ComplexStyleRule | string>;
  const fn = mapFn as (value: unknown, themeVars: ThemeVars) => ComplexStyleRule;

  return vanillaStyleVariants(resolvedMap, (value) => fn(value, themeVars));
}) as StyleVariants;

export { styleVariants };

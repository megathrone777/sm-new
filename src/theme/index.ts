import { style, styleVariants, type ComplexStyleRule } from "@vanilla-extract/css";

import { devices } from "./variables";

import { vars } from "./theme.css";

type ThemeVars = typeof vars & {
  devices: typeof devices;
};

type StyleArg = ((themeVars: ThemeVars) => ComplexStyleRule) | ComplexStyleRule;

type BooleanVariantSet = {
  off: ComplexStyleRule;
  on: ComplexStyleRule;
};

type BooleanVariantsMap<TProps extends Record<string, boolean>> = {
  [V in keyof TProps]: BooleanVariantSet;
};

type StringVariantsMap<TProps extends Record<string, string>> = {
  [V in TProps[keyof TProps]]: ComplexStyleRule;
};

const resolveStyle = (arg: StyleArg, themeVars: ThemeVars): string =>
  style(typeof arg === "function" ? arg(themeVars) : arg);

const css = (arg: StyleArg): string =>
  resolveStyle(arg, { devices, ...vars });

type CssVariants = {
  <TProps extends Record<string, boolean>>(
    variants:
      | ((themeVars: ThemeVars) => BooleanVariantsMap<TProps>)
      | BooleanVariantsMap<TProps>,
    base: StyleArg,
  ): (props: TProps) => string;

  <TProps extends Record<string, string>>(
    variants:
      | ((themeVars: ThemeVars) => StringVariantsMap<TProps>)
      | StringVariantsMap<TProps>,
    base: StyleArg,
  ): (props: TProps) => string;

  <Map extends Record<string, ComplexStyleRule | string>>(
    variantMap: ((themeVars: ThemeVars) => Map) | Map,
    mapFn: (value: Map[keyof Map], themeVars: ThemeVars) => ComplexStyleRule,
  ): Record<keyof Map, string>;
};

const isBooleanVariantSet = (value: unknown): value is BooleanVariantSet =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  "off" in value &&
  "on" in value;

const isMapFn = (secondArg: unknown): boolean => {
  if (typeof secondArg !== "function") return false;

  const fn = secondArg as (...args: unknown[]) => unknown;

  if (fn.length >= 2) return true;
  if (fn.length === 0) return false;

  return !/^\s*(?:async\s+)?\(?\s*[{[]/.test(fn.toString());
};

const cssVariants: CssVariants = ((
  variantMap: unknown,
  secondArg: unknown,
): unknown => {
  const themeVars: ThemeVars = { devices, ...vars };
  const resolvedMap =
    typeof variantMap === "function"
      ? (variantMap as (t: ThemeVars) => Record<string, unknown>)(themeVars)
      : (variantMap as Record<string, unknown>);

  if (isMapFn(secondArg)) {
    const mapFn = secondArg as (value: unknown, themeVars: ThemeVars) => ComplexStyleRule;

    return styleVariants(resolvedMap as Record<string, ComplexStyleRule | string>, (value) =>
      mapFn(value, themeVars),
    );
  }

  const baseClass = resolveStyle(secondArg as StyleArg, themeVars);
  const firstValue = Object.values(resolvedMap)[0];

  if (isBooleanVariantSet(firstValue)) {
    const classMap: Record<string, { off: string; on: string }> = {};

    for (const key in resolvedMap) {
      const set = resolvedMap[key] as BooleanVariantSet;

      classMap[key] = { off: style(set.off), on: style(set.on) };
    }

    return (props: Record<string, boolean>) => {
      const classes = [baseClass];

      for (const key in props) {
        const entry = classMap[key];

        if (entry) classes.push(props[key] ? entry.on : entry.off);
      }

      return classes.join(" ");
    };
  }

  const classMap: Record<string, string> = {};

  for (const key in resolvedMap) {
    classMap[key] = style(resolvedMap[key] as ComplexStyleRule);
  }

  return (props: Record<string, string>) => {
    const classes = [baseClass];

    for (const key in props) {
      const cls = classMap[props[key] as string];

      if (cls) classes.push(cls);
    }

    return classes.join(" ");
  };
}) as CssVariants;

export { css, cssVariants, devices, vars };
export { themeClass } from "./theme.css";

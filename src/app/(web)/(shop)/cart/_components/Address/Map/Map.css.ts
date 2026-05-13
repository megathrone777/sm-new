import { css } from "@/theme";

export const markerClass = css(({ colors }) => ({
  background: "none",
  color: colors.red,
}));

export const routeClass = css(({ colors }) => ({
  color: colors.red,
  fill: "none",
  stroke: colors.red,
}));

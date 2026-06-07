import { style } from "@/theme";

export const markerClass = style(({ colors }) => ({
  background: "none",
  color: colors.amber,
  width: 17,
}));

export const markerIconClass = style({
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
});

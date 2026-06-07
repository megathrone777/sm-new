import { style, globalStyle } from "@/theme";

export const wrapperClass = style({
  borderRadius: 5,
  height: 200,
  minHeight: 200,
  overflow: "hidden",
  position: "relative",
  width: "100%",
  zIndex: 8,
});

globalStyle(`.${wrapperClass} .maplibregl-canvas`, {
  filter: "brightness(1.7)",
});

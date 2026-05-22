import { css, globalStyle } from "@/theme";

export const wrapperClass = css({
  borderRadius: 5,
  height: 200,
  overflow: "hidden",
  position: "relative",
  width: "100%",
  zIndex: 8,
});

globalStyle(`.${wrapperClass} .maplibregl-canvas`, {
  filter: "brightness(1.7)",
});

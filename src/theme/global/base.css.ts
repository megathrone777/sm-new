import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  width: "100%",
});

globalStyle("html", {
  height: "-webkit-fill-available",
  overflowY: "scroll",
  scrollBehavior: "smooth",
});

globalStyle("body", {
  fontFamily: "var(--font-avenir)",
  min-height: "-webkit-fill-available",
  MozOsxFontSmoothing: "grayscale",
  WebkitFontSmoothing: "antialiased",
});

globalStyle("button", {
  cursor: "pointer",
});

globalStyle("svg", {
  height: "100%",
  width: "100%",
});

globalStyle("img", {
  maxWidth: "100%",
  verticalAlign: "middle",
});

globalStyle("pre", {
  font: "inherit",
  lineHeight: "inherit",
});

globalStyle("object", {
  display: "none",
});

globalStyle("b", {
  fontWeight: 500,
});

globalStyle(".leaflet-div-icon", {
  background: "none",
  border: "none",
});

globalStyle(".leaflet-zoom-animated", {
  height: "auto",
  width: "auto",
});

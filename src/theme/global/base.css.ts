import { globalStyle } from "@/theme";

globalStyle("html, body", {
  width: "100%",
});

globalStyle("html", {
  overflowY: "scroll",
});

globalStyle("body", {
  fontFamily: "var(--font-avenir)",
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

globalStyle("b", ({ fonts }) => ({
  fontWeight: fonts.demi,
}));

// globalStyle(".leaflet-div-icon", {
//   background: "none",
//   border: "none",
// });

globalStyle(".leaflet-zoom-animated", {
  height: "auto",
  width: "auto",
});

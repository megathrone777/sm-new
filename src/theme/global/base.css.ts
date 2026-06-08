import { globalStyle } from "@/theme";

globalStyle("html, body", {
  height: "100%",
  width: "100%",
});

globalStyle("html", {
  overflowY: "scroll",
});

globalStyle("body", {
  fontFamily: "var(--font-avenir)",
  minWidth: 340,
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

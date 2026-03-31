import { css } from "@/theme";

export const wrapperClass = css({
  background: "black",
  height: 100,
  insetInline: 0,
  position: "absolute",
  top: 0,
  zIndex: 10,
});

export const layoutClass = css({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "column",
  height: 96,
  justifyContent: "space-between",
  paddingRight: 10,
  paddingTop: 20,
});

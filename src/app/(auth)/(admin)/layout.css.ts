import { css } from "@/theme";

export const wrapperClass = css({
  alignContent: "start",
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateRows: "auto 1fr",
  height: "100%",
});

export const layoutClass = css({
  alignContent: "start",
  display: "grid",
  gap: 30,
  gridAutoFlow: "column",
  gridTemplateColumns: "220px 1fr",
  height: "100%",
  justifyContent: "start",
});

export const contentClass = css({
  paddingBottom: 20,
  position: "relative",
});

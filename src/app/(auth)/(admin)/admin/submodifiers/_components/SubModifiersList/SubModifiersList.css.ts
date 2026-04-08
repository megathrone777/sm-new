import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 20,
});

export const itemClass = css({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  paddingRight: 7,
});

export const itemFormClass = css({
  alignItems: "center",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr",
});

export const linkClass = css({
  display: "inline-block",
  height: 38,
});

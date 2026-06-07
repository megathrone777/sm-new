import { style } from "@/theme";

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 20,
});

export const itemClass = style({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  paddingRight: 7,
});

export const itemFormClass = style({
  alignItems: "center",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr 1fr",
});

export const linkClass = style({
  display: "inline-block",
  height: 38,
});

import { style } from "@/theme";

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 20,
});

export const itemClass = style({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  paddingRight: 7,
});

export const formClass = style({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr 1fr auto",
});

export const createFormClass = style({
  display: "grid",
  gridAutoFlow: "row",
  marginLeft: "auto",
  paddingBottom: 40,
  rowGap: 20,
  width: 400,
});

export const linkClass = style({
  display: "inline-block",
  height: 38,
});

import { style } from "@/theme";

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 30,
  rowGap: 16,
});

export const itemClass = style({
  borderBottom: "1px solid #eee",
  paddingBottom: 12,
});

export const rowClass = style({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
});

export const editFormClass = style({
  alignItems: "end",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1.5fr",
});

export const linkClass = style({
  display: "inline-block",
  height: 38,
});

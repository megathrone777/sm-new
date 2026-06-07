import { style } from "@/theme";

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 16,
});

export const itemClass = style({
  borderBottom: "1px solid #eee",
  paddingBottom: 12,
});

export const formClass = style({
  alignItems: "end",
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr",
});

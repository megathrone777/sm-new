import { style } from "@/theme";

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 30,
});

export const itemClass = style({
  borderBottom: "1px dashed #ddd",
  paddingBottom: 12,
});

export const dayTitleClass = style(({ fonts }) => ({
  fontSize: 19,
  fontWeight: fonts.bold,
  marginBottom: 8,
  textTransform: "capitalize",
}));

export const formClass = style({
  columnGap: 12,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
});

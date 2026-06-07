import { rgba, style } from "@/theme";

export const linkClass = style(({ colors, fonts }) => ({
  alignItems: "center",
  borderRadius: 6,
  color: colors.black,
  columnGap: 8,
  display: "grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  justifyContent: "start",
  padding: 6,
  whiteSpace: "nowrap",

  ":hover": {
    backgroundColor: rgba(colors.black, 0.1),
  },
}));

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 4,
});

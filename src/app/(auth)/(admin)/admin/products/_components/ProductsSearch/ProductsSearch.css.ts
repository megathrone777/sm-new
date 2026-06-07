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

export const imageClass = style({
  height: "100%",
  objectFit: "cover",
  width: "100%",
});

export const imageHolderClass = style({
  borderRadius: "50%",
  height: 35,
  overflow: "hidden",
  position: "relative",
  width: 35,
});

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 4,
});

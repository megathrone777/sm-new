import { rgba, style } from "@/theme";

export const headerClass = style(({ fonts }) => ({
  display: "grid",
  fontWeight: fonts.bold,
  gridAutoFlow: "column",
  gridTemplateColumns: "minmax(30px, auto) repeat(4, 1fr)",
  justifyItems: "center",
  marginBottom: 16,
  paddingLeft: 10,
}));

export const listClass = style({
  display: "grid",
  gridAutoFlow: "row",
});

export const itemClass = style(({ colors }) => ({
  alignItems: "center",
  borderBottom: `2px solid ${colors.grayLighter}`,
  columnGap: 5,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  paddingRight: 7,
}));

export const linkClass = style(({ colors, fonts }) => ({
  alignItems: "center",
  color: colors.black,
  display: "grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  gridTemplateColumns: "minmax(30px, auto) repeat(4, 1fr)",
  height: "100%",
  justifyItems: "center",
  paddingBlock: 5,
  paddingLeft: 10,

  ":hover": {
    backgroundColor: rgba(colors.black, 0.1),
  },
}));

export const imageHolderClass = style({
  borderRadius: "50%",
  height: 60,
  overflow: "hidden",
  position: "relative",
  width: 60,
});

export const imageClass = style({
  height: "100%",
  objectFit: "cover",
  width: "100%",
});

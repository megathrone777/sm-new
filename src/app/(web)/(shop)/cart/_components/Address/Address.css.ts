import { style } from "@/theme";

export const wrapperClass = style({
  display: "grid",
  gridAutoFlow: "row",
  paddingTop: 20,
  rowGap: 10,
});

export const addressClass = style(({ devices }) => ({
  "@media": {
    [devices.mobile]: {
      whiteSpace: "nowrap",
    },
  },
}));

export const cityClass = style({
  whiteSpace: "nowrap",
});

export const iconClass = style(({ colors }) => ({
  color: colors.red,
  display: "inline-block",
  height: 24,
  marginRight: 6,
  verticalAlign: -6,
  width: 18,
}));

export const linkClass = style(({ colors, fonts }) => ({
  color: "black",
  fontSize: 15,
  fontWeight: fonts.medium,
  textDecoration: "none",

  ":hover": {
    color: colors.red,
  },
}));

import { css } from "@/theme";

export const wrapperClass = css({
  display: "grid",
  gridAutoFlow: "row",
  paddingTop: 20,
  rowGap: 10,
});

export const addressClass = css(({ devices }) => ({
  "@media": {
    [devices.mobile]: {
      whiteSpace: "nowrap",
    },
  },
}));

export const cityClass = css({
  whiteSpace: "nowrap",
});

export const iconClass = css(({ colors }) => ({
  color: colors.red,
  display: "inline-block",
  height: 24,
  marginRight: 6,
  verticalAlign: -6,
  width: 18,
}));

export const linkClass = css(({ colors, fonts }) => ({
  color: "black",
  fontSize: 15,
  fontWeight: fonts.medium,
  textDecoration: "none",

  ":hover": {
    color: colors.red,
  },
}));

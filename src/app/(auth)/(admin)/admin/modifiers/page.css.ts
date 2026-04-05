import { css } from "@/theme";

export const headerClass = css(({ fonts }) => ({
  display: "grid",
  fontWeight: fonts.bold,
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(4, 1fr)",
  justifyContent: "start",
  marginBottom: 8,
  paddingInline: 10,
}));

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 5,
});

export const itemClass = css(({ colors }) => ({
  borderBottom: `2px solid ${colors.grayLighter}`,
  paddingBottom: 5,
}));

export const linkClass = css(({ colors, fonts }) => ({
  alignItems: "center",
  color: colors.grayDarkest,
  display: "grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(4, 1fr)",
  justifyContent: "start",
  paddingInline: 10,

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .1)",
  },
}));

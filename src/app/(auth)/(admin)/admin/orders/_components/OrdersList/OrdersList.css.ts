import { css } from "@/theme";

export const headerClass = css(({ fonts }) => ({
  display: "grid",
  fontWeight: fonts.bold,
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(6, 1fr) auto",
  justifyContent: "start",
  marginBottom: 16,
  paddingLeft: 10,
}));

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
});

export const itemClass = css(({ colors }) => ({
  alignItems: "center",
  borderBottom: `2px solid ${colors.grayLighter}`,
  columnGap: 5,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  minHeight: 50,
  paddingRight: 7,
}));

export const linkClass = css(({ colors, fonts }) => ({
  alignItems: "center",
  color: colors.black,
  display: "grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(6, 1fr)",
  height: "100%",
  justifyContent: "start",
  paddingBlock: 5,
  paddingLeft: 10,

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .1)",
  },
}));

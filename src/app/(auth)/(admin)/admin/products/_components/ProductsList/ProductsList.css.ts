import { css } from "@/theme";

export const headerClass = css(({ fonts }) => ({
  display: "grid",
  fontWeight: fonts.bold,
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(4, 1fr) auto",
  justifyContent: "start",
  marginBottom: 8,
  paddingLeft: 10,
}));

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 5,
});

export const itemClass = css(({ colors }) => ({
  alignItems: "center",
  borderBottom: `2px solid ${colors.grayLighter}`,
  columnGap: 5,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  paddingBottom: 5,
  paddingRight: 7,
}));

export const linkClass = css(({ colors, fonts }) => ({
  alignItems: "center",
  color: colors.grayDarkest,
  display: "grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(4, 1fr)",
  justifyContent: "start",
  paddingLeft: 10,

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .1)",
  },
}));

export const imageHolderClass = css({
  borderRadius: "50%",
  height: 60,
  overflow: "hidden",
  position: "relative",
  width: 60,
});

export const imageClass = css({
  height: "100%",
  objectFit: "cover",
  width: "100%",
});

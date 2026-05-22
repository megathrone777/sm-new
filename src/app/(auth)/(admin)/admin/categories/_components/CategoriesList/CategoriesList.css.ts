import { css } from "@/theme";

export const headerClass = css(({ devices, fonts }) => ({
  display: "grid",
  fontSize: 14,
  fontWeight: fonts.bold,
  gridAutoFlow: "column",
  gridTemplateColumns: "minmax(30px, auto) repeat(4, 1fr) auto",
  justifyItems: "center",
  marginBottom: 5,

  "@media": {
    [devices.mobile]: {
      fontSize: 16,
      marginBottom: 16,
      paddingLeft: 10,
    },
  },
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
  minHeight: 55,
  paddingRight: 7,
}));

export const linkClass = css(({ colors, devices, fonts }) => ({
  alignItems: "center",
  color: colors.black,
  display: "grid",
  fontSize: 14,
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  gridTemplateColumns: "minmax(30px, auto) repeat(4, 1fr)",
  height: "100%",
  justifyItems: "center",

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .1)",
  },

  "@media": {
    [devices.mobile]: {
      fontSize: 16,
      paddingBlock: 5,
      paddingLeft: 10,
    },
  },
}));

export const imageHolderClass = css(({ devices }) => ({
  borderRadius: "50%",
  height: 45,
  overflow: "hidden",
  position: "relative",
  width: 45,

  "@media": {
    [devices.mobile]: {
      height: 60,
      width: 60,
    },
  },
}));

export const imageClass = css({
  height: "100%",
  objectFit: "cover",
  width: "100%",
});

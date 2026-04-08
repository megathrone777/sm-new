import { css } from "@/theme";

export const wrapperClass = css(({ animations, devices, easing }) => ({
  animation: `${animations.fadeIn} .35s ${easing} forwards`,
  backgroundColor: "white",
  borderRadius: 15,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  display: "grid",
  gridAutoFlow: "row",
  overflow: "hidden",
  position: "relative",

  "@media": {
    [devices.mobileXs]: {
      gridAutoFlow: "column",
    },

    [devices.mobile]: {
      gridAutoFlow: "row",
      gridTemplateRows: "1fr auto",
      paddingBottom: 10,
    },
  },
}));

export const linkClass = css(({ colors, devices }) => ({
  color: colors.black,
  display: "grid",
  gridAutoFlow: "row",
  width: "100%",

  "@media": {
    [devices.mobileXs]: {
      gridAutoFlow: "column",
      gridTemplateColumns: "180px 1fr",
    },

    [devices.mobile]: {
      alignContent: "start",
      gridAutoFlow: "row",
      gridTemplateColumns: "1fr",
    },
  },
}));

export const imageHolderClass = css(({ devices }) => ({
  borderRadius: "15px 15px 0 0",
  height: 180,
  overflow: "hidden",
  position: "relative",
  textAlign: "center",

  "@media": {
    [devices.mobileXs]: {
      borderRadius: "15px 0 0 15px",
      height: 260,
    },

    [devices.mobile]: {
      borderRadius: "15px 15px 0 0",
      height: 180,
    },

    [devices.tablet]: {
      height: 230,
    },

    [devices.desktop]: {
      height: 340,
    },
  },
}));

export const imageClass = css(({ easing }) => ({
  objectFit: "cover",
  selectors: {
    [`${imageHolderClass}:hover > &`]: {
      transform: "scale(1.05)",
    },
  },
  transition: `transform .5s ${easing}`,
}));

export const contentClass = css(({ devices }) => ({
  minHeight: 140,
  padding: "9px 6px 20px",

  "@media": {
    [devices.mobileXs]: {},

    [devices.mobile]: {
      minHeight: 160,
      paddingLeft: 10,
      paddingRight: 10,
    },

    [devices.desktop]: {
      minHeight: 170,
      paddingLeft: 16,
      paddingTop: 16,
    },
  },
}));

export const titleClass = css(({ devices, fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
  marginBottom: 9,

  "@media": {
    [devices.mobile]: {
      alignContent: "center",
      display: "inline-grid",
      fontSize: 22,
      lineHeight: 1.2,
      minHeight: 30,
    },

    [devices.tablet]: {
      marginBottom: 12,
    },
  },
}));

export const textClass = css(({ colors, devices }) => ({
  color: colors.gray,
  fontSize: 14,
  marginBottom: 3,
  paddingLeft: 13,
  position: "relative",

  ":before": {
    background: colors.gray,
    borderRadius: "50%",
    content: "''",
    display: "block",
    height: 7,
    left: 2,
    position: "absolute",
    top: 5,
    width: 7,
  },

  "@media": {
    [devices.tablet]: {
      paddingLeft: 14,
    },
  },
}));

export const actionsClass = css(({ devices }) => ({
  alignContent: "stretch",
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  height: 50,
  justifyContent: "space-between",
  minHeight: 50,
  paddingLeft: 10,

  "@media": {
    [devices.mobileXs]: {
      bottom: 0,
      left: 180,
      paddingLeft: 6,
      position: "absolute",
      right: 0,
    },

    [devices.mobile]: {
      height: 45,
      minHeight: 45,
      paddingLeft: 10,
      position: "static",
    },
  },
}));

export const priceClass = css(({ devices, fonts }) => ({
  fontSize: 22,
  fontWeight: fonts.medium,
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobile]: {
      fontSize: 24,
    },
  },
}));

export const placeholderClass = css(({ colors, devices }) => ({
  color: colors.red,
  fontSize: 14,
  paddingRight: 10,
  textAlign: "center",

  "@media": {
    [devices.mobile]: {
      fontSize: 16,
    },
  },
}));

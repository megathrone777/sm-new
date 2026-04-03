import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  alignContent: "stretch",
  backgroundPosition: "right top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  borderBottom: `4px solid ${colors.red}`,
  display: "grid",
  minHeight: 120,
  paddingBottom: 15,
  paddingTop: 120,
  position: "relative",
  zIndex: 2,

  "@media": {
    [devices.mobile]: {
      paddingTop: 130,
    },

    [devices.tablet]: {
      paddingBottom: 20,
    },

    [devices.desktop]: {
      paddingBottom: 25,
      paddingTop: 160,
    },

    [devices.desktopLg]: {
      paddingBottom: 35,
      paddingTop: 175,
    },
  },
}));

export const contentClass = css(({ devices }) => ({
  alignContent: "start",
  display: "grid",
  gridAutoFlow: "row",
  height: "100%",
  justifyItems: "start",
  maxWidth: 280,
  rowGap: 15,

  "@media": {
    [devices.tablet]: {
      maxWidth: 600,
    },

    [devices.desktop]: {
      rowGap: 20,
    },

    [devices.desktopLg]: {
      alignContent: "start",
      rowGap: 25,
    },
  },
}));

export const titleClass = css(({ devices, fonts }) => ({
  color: "white",
  fontSize: 20,
  fontWeight: fonts.bold,
  lineHeight: "normal",
  textWrap: "balance",

  "@media": {
    [devices.tablet]: {
      fontSize: 28,
    },

    [devices.desktop]: {
      fontSize: 38,
    },

    [devices.desktopLg]: {
      fontSize: 42,
      lineHeight: 1.3,
    },
  },
}));

export const textClass = css(({ devices }) => ({
  color: "white",
  display: "none",
  fontSize: 16,
  fontStyle: "italic",
  lineHeight: 1.4,

  "@media": {
    [devices.tablet]: {
      display: "block",
    },

    [devices.desktop]: {
      fontSize: 18,
    },
  },
}));

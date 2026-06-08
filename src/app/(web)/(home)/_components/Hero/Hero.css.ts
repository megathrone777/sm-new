import { style } from "@/theme";

export const wrapperClass = style(({ colors }) => ({
  borderBottom: `4px solid ${colors.red}`,
  position: "relative",
}));

export const layoutClass = style(({ devices }) => ({
  alignContent: "stretch",
  display: "grid",
  minHeight: 280,
  paddingBottom: 20,
  paddingTop: 120,
  position: "relative",
  zIndex: 1,

  "@media": {
    [devices.mobile]: {
      paddingTop: 130,
    },

    [devices.desktop]: {
      paddingBottom: 30,
      paddingTop: 160,
    },

    [devices.desktopLg]: {
      minHeight: 900,
      paddingTop: 175,
    },
  },
}));

export const contentClass = style(() => ({
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateRows: "auto 1fr",
  height: "100%",
}));

export const heroClass = style(({ devices }) => ({
  alignContent: "start",
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "start",
  paddingLeft: 5,
  rowGap: 15,
  textWrap: "balance",

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

export const titleClass = style(({ devices, fonts }) => ({
  color: "white",
  fontSize: 25,
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

export const textClass = style(({ devices }) => ({
  color: "white",
  fontSize: 16,
  fontStyle: "italic",
  lineHeight: 1.4,

  "@media": {
    [devices.desktop]: {
      fontSize: 18,
    },
  },
}));

import { style } from "@/theme";

export const wrapperClass = style(({ colors, devices }) => ({
  alignContent: "stretch",
  backgroundPositionX: "right -298px",
  backgroundPositionY: "top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto 100%",
  borderBottom: `4px solid ${colors.red}`,
  display: "grid",
  minHeight: 120,
  paddingBlock: "120px 20px",

  "@media": {
    [devices.mobile]: {
      paddingTop: 130,
    },

    [devices.tablet]: {
      backgroundSize: "cover",
    },

    [devices.desktop]: {
      paddingBlock: "160px 30px",
    },

    [devices.desktopLg]: {
      backgroundPositionX: "right",
      backgroundSize: "cover",
      paddingTop: 175,
    },
  },
}));

export const contentClass = style(({ devices }) => ({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateRows: "auto 1fr",
  height: "100%",

  "@media": {
    [devices.desktop]: {
      alignItems: "center",
    },
  },
}));

export const heroClass = style(({ devices }) => ({
  alignContent: "start",
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "start",
  paddingLeft: 5,
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

export const titleClass = style(({ devices, fonts }) => ({
  color: "white",
  fontSize: 24,
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
  display: "none",
  fontSize: 16,
  fontStyle: "italic",
  lineHeight: 1.4,
  textWrap: "balance",

  "@media": {
    [devices.tablet]: {
      display: "block",
    },

    [devices.desktop]: {
      fontSize: 18,
    },
  },
}));

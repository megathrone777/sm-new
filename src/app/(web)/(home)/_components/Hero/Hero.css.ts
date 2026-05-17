import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  borderBottom: `4px solid ${colors.red}`,
  position: "relative",
}));

export const layoutClass = css(({ devices }) => ({
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

export const pictureClass = css({
  bottom: 0,
  display: "block",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
});

export const bgImageClass = css({
  height: "100%",
  objectFit: "cover",
  objectPosition: "center top",
  width: "100%",
});

export const contentClass = css(({ devices }) => ({
  alignContent: "start",
  display: "grid",
  gridAutoFlow: "row",
  height: "100%",
  justifyItems: "start",
  maxWidth: 280,
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
  fontSize: 16,
  fontStyle: "italic",
  lineHeight: 1.4,

  "@media": {
    [devices.desktop]: {
      fontSize: 18,
    },
  },
}));

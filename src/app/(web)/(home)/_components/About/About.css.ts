import { css, globalStyle } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  borderTop: `3px solid ${colors.red}`,
  minHeight: 0,
  paddingBlock: 25,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      minHeight: 400,
      paddingBlock: 50,
    },
  },
}));

export const titleClass = css(({ devices }) => ({
  fontSize: 25,
  fontWeight: "700",
  marginBottom: 10,

  "@media": {
    [devices.mobile]: {
      marginBottom: 20,
    },

    [devices.desktop]: {
      fontSize: 40,
      marginBottom: 30,
    },
  },
}));

export const textClass = css(({ devices }) => ({
  fontSize: 18,
  letterSpacing: "normal",
  lineHeight: "1.2",
  margin: "0 auto",
  maxWidth: "100%",
  textRendering: "optimizeLegibility",

  "@media": {
    [devices.tablet]: {
      letterSpacing: 1,
      maxWidth: "80%",
    },

    [devices.desktop]: {
      fontSize: 20,
      maxWidth: 700,
    },
  },
}));

globalStyle(`.${textClass} > *, .${textClass} > p`, ({ devices }) => ({
  marginBottom: 15,

  "@media": {
    [devices.tablet]: {
      marginBottom: 20,
    },
  },
}));

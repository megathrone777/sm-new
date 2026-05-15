import { css, globalStyle } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: 0,
  paddingBlock: 25,
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      borderTop: "3px solid #da2629",
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

    [devices.tablet]: {
      fontSize: 40,
      marginBottom: 30,
    },
  },
}));

export const textClass = css(({ devices }) => ({
  fontSize: 18,
  letterSpacing: 0,
  margin: "0 auto",
  maxWidth: "100%",
  textRendering: "optimizeLegibility",

  "@media": {
    [devices.mobile]: {
      letterSpacing: 1,
      maxWidth: "80%",
    },

    [devices.tablet]: {
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
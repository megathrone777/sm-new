import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  overflow: "hidden",
  paddingBlock: "30px 10px",

  "@media": {
    [devices.desktop]: {
      paddingBlock: "90px 50px",
    },
  },
}));

export const layoutClass = css({
  margin: "0 auto 40px",
  maxWidth: 1200,
});

export const titleClass = css(({ devices, fonts }) => ({
  color: "white",
  fontSize: 30,
  fontWeight: fonts.bold,
  marginBottom: 30,
  paddingTop: 15,

  "@media": {
    [devices.tablet]: {
      fontSize: 28,
    },

    [devices.desktop]: {
      fontSize: 42,
      marginBottom: 10,
    },
  },
}));

export const descriptionClass = css(({ devices, fonts }) => ({
  color: "white",
  fontFamily: "inherit",
  fontSize: 21,
  fontWeight: fonts.bold,
  marginBottom: 20,

  "@media": {
    [devices.mobile]: {
      fontSize: 26,
      marginBottom: 30,
    },
  },
}));

export const listClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  paddingInline: 20,

  "@media": {
    [devices.tablet]: {
      marginBottom: 0,
    },

    [devices.desktop]: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 60,
    },
  },
}));

export const itemClass = css(({ colors, devices, fonts }) => ({
  marginBottom: 40,
  maxWidth: "100%",
  position: "relative",
  width: "100%",

  ":before": {
    color: colors.grayDarkest,
    content: "attr(data-count)",
    fontFamily: "inherit",
    fontSize: 80,
    fontWeight: fonts.medium,
    opacity: 0.7,
    position: "absolute",
    top: -30,
    zIndex: 1,
  },

  "@media": {
    [devices.mobile]: {
      ":before": {
        fontSize: 150,
        top: -55,
      },

      ":last-of-type": {
        marginBottom: 0,
      },
    },

    [devices.tablet]: {
      flex: `0 1 ${calc("33%").subtract("10px")}`,
      maxWidth: `${calc("33%").subtract("10px")}`,
    },

    [devices.desktop]: {
      width: "33%",
    },
  },
}));

export const itemTitleClass = css(({ devices, fonts }) => ({
  color: "white",
  fontSize: 24,
  fontWeight: fonts.bold,
  marginBottom: 10,
  position: "relative",
  zIndex: 2,

  "@media": {
    [devices.tablet]: {
      fontSize: 20,
    },

    [devices.desktop]: {
      fontSize: 28,
    },
  },
}));

export const itemTextClass = css(({ colors }) => ({
  color: colors.grayLighter,
  fontFamily: "inherit",
  fontSize: 18,
  lineHeight: 1.4,
  position: "relative",
  zIndex: 2,
}));

import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css({
  paddingBlock: 30,
});

export const layoutClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginBottom: 25,

  "@media": {
    [devices.mobile]: {
      justifyContent: "space-around",
    },
  },
}));

export const contentClass = css({
  flex: `0 1 ${calc("33%").subtract("20px")}`,
  marginBottom: 15,
  selectors: {
    "&:nth-of-type(2)": {
      order: 3,
    },
  },
  textAlign: "left",

  ":first-of-type": {
    order: 1,
    paddingLeft: 20,
  },

  ":last-of-type": {
    marginBottom: 0,
    order: 2,
  },
});

export const titleClass = css(({ devices, fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.medium,
  marginBottom: 15,
  textAlign: "center",

  "@media": {
    [devices.mobile]: {
      fontSize: 36,
      marginBottom: 30,
    },
  },
}));

export const imageHolderClass = css({
  height: 450,
  marginInline: "auto",
  position: "relative",
  textAlign: "center",
  width: "auto",
});

export const footerClass = css({
  textAlign: "center",
});

export const itemClass = css({
  fontSize: 18,
  marginBottom: 10,
});

export const descriptionClass = css(({ devices }) => ({
  fontSize: 16,
  marginBottom: 15,
  maxWidth: 500,
  paddingLeft: 40,
  position: "relative",

  "@media": {
    [devices.mobile]: {
      fontSize: 18,
    },
  },
}));

export const iconClass = css({
  color: "lightgreen",
  display: "inline-block",
  left: 0,
  maxWidth: 30,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  verticalAlign: "middle",
});

export const subitemClass = css({
  fontSize: 20,
  marginBottom: 10,
});

export const columnClass = css({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  textAlign: "center",
});

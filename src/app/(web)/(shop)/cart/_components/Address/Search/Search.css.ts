import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  maxWidth: "100%",
  position: "relative",

  "@media": {
    [devices.tablet]: {
      maxWidth: 437,
    },
  },
}));

export const layoutClass = css({
  alignContent: "center",
  alignItems: "center",
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
});

export const distanceClass = css(({ devices }) => ({
  display: "none",
  left: `${calc("100%").add("20px")}`,
  marginLeft: 10,
  position: "absolute",
  top: 10,
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobile]: {
      display: "inline-block",
    },
  },
}));

export const resultsClass = css({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  width: "100%",
});

export const deliveryPriceClass = css(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
  marginTop: 25,
}));

export const deliveryCurrencyClass = css({
  fontSize: 16,
});

export const deliveryErrorClass = css(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 20,
  fontWeight: fonts.bold,
  paddingBlock: "15px 10px",
  textAlign: "left",
}));

export const resetButtonClass = css({
  appearance: "none",
  backgroundColor: "transparent",
  border: "none",
  color: "black",
  cursor: "pointer",
  height: 25,
  padding: 0,
  position: "absolute",
  right: 52,
  top: 5,
  width: 25,
});

export const suggestionsClass = css(({ colors }) => ({
  backgroundColor: "white",
  border: `1px solid ${colors.red}`,
  borderRadius: 4,
  left: 0,
  overflow: "hidden",
  position: "absolute",
  top: 45,
  width: "100%",
  zIndex: 9,
}));

export const suggestionsItemClass = css(({ colors }) => ({
  cursor: "pointer",
  height: 38,
  lineHeight: "38px",
  maxWidth: "100%",
  minHeight: 38,
  overflow: "hidden",
  paddingInline: 8,
  whiteSpace: "nowrap",
  width: "100%",

  ":hover": {
    backgroundColor: colors.whiteLighter,
  },
}));

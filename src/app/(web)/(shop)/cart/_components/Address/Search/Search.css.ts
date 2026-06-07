import { calc } from "@vanilla-extract/css-utils";

import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  maxWidth: "100%",
  position: "relative",

  "@media": {
    [devices.tablet]: {
      maxWidth: 437,
    },
  },
}));

export const layoutClass = style({
  alignContent: "center",
  alignItems: "center",
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
});

export const distanceClass = style(({ devices }) => ({
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

export const resultsClass = style({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  width: "100%",
});

export const deliveryPriceClass = style(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
  marginTop: 25,
}));

export const deliveryCurrencyClass = style({
  fontSize: 16,
});

export const deliveryErrorClass = style(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 20,
  fontWeight: fonts.bold,
  paddingBlock: "15px 10px",
  textAlign: "left",
}));

export const resetButtonClass = style({
  appearance: "none",
  backgroundColor: "transparent",
  border: "none",
  color: "black",
  cursor: "pointer",
  height: 25,
  padding: 0,
  position: "absolute",
  right: 76,
  top: 5,
  width: 25,
});

export const suggestionsClass = style(({ colors }) => ({
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

export const suggestionsItemClass = style(({ colors }) => ({
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

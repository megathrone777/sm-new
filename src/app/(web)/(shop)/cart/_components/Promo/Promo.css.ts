import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const layoutClass = css({
  alignContent: "start",
  alignItems: "start",
  border: "none",
  columnGap: 20,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto",
  paddingTop: 10,
  position: "relative",

  ":disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },
});

export const loadingWrapperClass = css({
  height: 25,
  left: -5,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 25,
});

export const successIconClass = css({
  color: "green",
  display: "block",
  height: 25,
  left: -5,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 25,
});

export const resetButtonClass = css(({ colors }) => ({
  backgroundColor: "transparent",
  color: colors.red,
  cursor: "pointer",
  display: "block",
  height: 25,
  left: `${calc("100%").subtract("170px")}`,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 25,
}));

export const submitClass = css({
  position: "relative",
});

export const buttonClass = css(({ colors, fonts }) => ({
  backgroundColor: colors.red,
  border: "none",
  borderRadius: 5,
  boxShadow: "0 0 8px 0 rgba(0, 0, 0, .3)",
  color: "white",
  cursor: "pointer",
  display: "inline-block",
  fontFamily: "inherit",
  fontSize: 20,
  fontWeight: fonts.medium,
  height: 35,
  lineHeight: "35px",
  minWidth: 120,
  padding: "0 10px",
  textAlign: "center",
  textDecoration: "none",
  transition: ".2s ease-in",

  ":hover": {
    boxShadow: "0 0 12px 0 rgba(218, 38, 40, 0.4)",
  },
}));

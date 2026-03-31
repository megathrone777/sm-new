import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignContent: "end",
  bottom: 20,
  display: "grid",
  height: 0,
  justifyContent: "end",
  paddingRight: 15,
  position: "sticky",
  width: "100%",
  zIndex: 101,

  "@media": {
    [devices.mobile]: {
      bottom: 40,
      paddingRight: 15,
    },

    [devices.desktop]: {
      bottom: calc("100dvh").subtract("94px").toString(),
      paddingRight: 30,
    },
  },
}));

export const layoutClass = css(({ colors, devices }) => ({
  alignItems: "stretch",
  backgroundColor: colors.red,
  border: "3px solid white",
  borderRadius: "50%",
  boxShadow: `0 0 0 3px ${colors.red}`,
  display: "grid",
  height: 55,
  justifyContent: "stretch",
  outline: `3px solid ${colors.red}`,
  position: "relative",
  width: 55,

  "@media": {
    [devices.mobile]: {
      height: 70,
      width: 70,
    },
  },
}));

export const linkClass = css({
  alignContent: "center",
  alignItems: "center",
  color: "white",
  cursor: "pointer",
  display: "grid",
  height: "100%",
  justifyContent: "center",
  overflow: "hidden",
  textIndent: -9999,
  width: "100%",
});

export const iconClass = css({
  display: "block",
  height: 35,
});

export const amountClass = css(({ fonts }) => ({
  backgroundColor: "white",
  borderRadius: "50%",
  bottom: -5,
  color: "black",
  fontSize: 16,
  fontWeight: fonts.bold,
  minWidth: 25,
  padding: 3,
  pointerEvents: "none",
  position: "absolute",
  right: -5,
  textAlign: "center",
  userSelect: "none",
}));

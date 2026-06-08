import { calc } from "@vanilla-extract/css-utils";

import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  alignContent: "end",
  bottom: 20,
  display: "grid",
  height: 0,
  justifyContent: "end",
  paddingRight: 15,
  pointerEvents: "none",
  position: "sticky",
  width: "100%",
  zIndex: 101,

  "@media": {
    [devices.pointerCoarse]: {
      bottom: `${calc("20px").add("env(safe-area-inset-bottom)")}`,
    },

    [devices.mobile]: {
      bottom: 30,
      paddingRight: 15,
    },

    [devices.desktop]: {
      bottom: `${calc("100dvh").subtract("96px")}`,
      paddingRight: 30,
    },

    [devices.desktopXl]: {
      paddingRight: 50,
    },
  },
}));

export const layoutClass = style(({ colors, devices }) => ({
  alignItems: "stretch",
  backgroundColor: colors.red,
  border: "3px solid white",
  borderRadius: "50%",
  boxShadow: `0 0 0 3px ${colors.red}`,
  display: "grid",
  height: 55,
  justifyContent: "stretch",
  pointerEvents: "auto",
  position: "relative",
  transform: "translate(-2px, -2px)",
  width: 55,

  "@media": {
    [devices.mobile]: {
      height: 70,
      width: 70,
    },
  },
}));

export const linkClass = style({
  alignContent: "center",
  alignItems: "center",
  color: "white",
  cursor: "pointer",
  display: "grid",
  height: "100%",
  justifyContent: "center",
  overflow: "hidden",
  verticalAlign: "middle",
  width: "100%",
});

export const iconClass = style({
  display: "block",
  height: 35,
});

export const amountClass = style(({ devices }) => ({
  alignContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "50%",
  bottom: -5,
  display: "grid",
  height: 20,
  justifyContent: "center",
  minWidth: 20,
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  right: -5,
  userSelect: "none",

  "@media": {
    [devices.desktop]: {
      height: 24,
      minWidth: 24,
      paddingInline: 3,
    },
  },
}));

export const amountValueClass = style(({ colors, devices, fonts }) => ({
  color: colors.black,
  fontSize: 13,
  fontWeight: fonts.bold,
  letterSpacing: 0,

  "@media": {
    [devices.tablet]: {
      fontSize: 15,
    },
  },
}));

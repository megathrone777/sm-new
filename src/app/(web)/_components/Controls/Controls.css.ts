import { calc } from "@vanilla-extract/css-utils";

import { rgba, style } from "@/theme";

export const wrapperClass = style({
  alignContent: "end",
  bottom: 0,
  display: "grid",
  height: 0,
  position: "sticky",
  zIndex: 201,
});

export const layoutClass = style(({ devices }) => ({
  alignContent: "end",
  display: "grid",
  gridAutoFlow: "row",
  height: "100dvh",
  justifyContent: "start",
  paddingBottom: 20,
  paddingLeft: 20,
  pointerEvents: "none",
  rowGap: 20,

  "@media": {
    [devices.pointerCoarse]: {
      paddingBottom: `${calc("20px").add("env(safe-area-inset-bottom)")}`,
    },

    [devices.mobile]: {
      paddingBottom: 25,
    },

    [devices.tablet]: {
      paddingBottom: 30,
    },

    [devices.desktop]: {
      justifyContent: "end",
      paddingBottom: 40,
      paddingRight: 40,
    },

    [devices.desktopXl]: {
      paddingRight: 50,
    },
  },
}));

export const buttonClass = style(({ colors, easing }) => ({
  alignItems: "center",
  backgroundColor: colors.white,
  border: "none",
  borderRadius: 4,
  boxShadow: `0 0 10px 0 ${rgba(colors.black, 0.5)}`,
  color: "black",
  display: "grid",
  height: 45,
  justifyContent: "center",
  opacity: 0.7,
  overflow: "hidden",
  pointerEvents: "auto",
  textIndent: -9999,
  transition: `opacity .2s ${easing}`,
  width: 45,

  ":hover": {
    opacity: 1,
  },
}));

export const iconClass = style({
  display: "block",
  width: 33,
});

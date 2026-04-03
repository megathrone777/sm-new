import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  height: 100,
  insetInline: 0,
  position: "absolute",
  top: 0,
  zIndex: 10,

  "@media": {
    [devices.desktop]: {
      height: 125,
    },
  },
}));

export const layoutClass = css(({ devices }) => ({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "column",
  height: "100%",
  justifyContent: "space-between",
  paddingRight: 10,
  paddingTop: 20,

  "@media": {
    [devices.desktop]: {
      alignItems: "center",
      columnGap: 30,
      justifyContent: "start",
      paddingRight: 0,
      paddingTop: 0,
    },

    [devices.desktopLg]: {
      columnGap: 90,
    },
  },
}));

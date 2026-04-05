import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignContent: "end",
  bottom: 90,
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
      bottom: `${calc("90px").add("env(safe-area-inset-bottom)")}`,
    },

    [devices.mobile]: {
      bottom: 120,
      paddingRight: 15,
    },

    [devices.desktop]: {
      bottom: `${calc("100dvh").subtract("196px")}`,
      paddingRight: 30,
    },

    [devices.desktopXl]: {
      paddingRight: 50,
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

export const linkClass = css({
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

export const iconClass = css({
  display: "block",
  height: 25,
});

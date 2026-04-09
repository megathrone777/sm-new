import { createContainer } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

const scrollContainer = createContainer();

export const wrapperClass = css({
  alignContent: "start",
  containerName: scrollContainer,
  containerType: "scroll-state",
  display: "grid",
  gridAutoFlow: "row",
  height: 0,
  position: "sticky",
  top: 0,
  zIndex: 200,
});

export const layoutClass = css(({ devices }) => ({
  alignContent: "end",
  display: "grid",
  // height: "100dvh",
  height: "-webkit-fill-available",
  justifyContent: "start",
  paddingBottom: 80,
  paddingLeft: 20,
  pointerEvents: "none",

  "@media": {
    [devices.pointerCoarse]: {
      paddingBottom: `${calc("80px").add("env(safe-area-inset-bottom)")}`,
    },

    [devices.mobile]: {
      paddingBottom: 85,
    },

    [devices.tablet]: {
      paddingBottom: 90,
    },

    [devices.desktop]: {
      justifyContent: "end",
      paddingBottom: 110,
      paddingRight: 40,
    },

    [devices.desktopXl]: {
      paddingRight: 50,
    },
  },
}));

export const buttonClass = css(({ colors, easing }) => ({
  alignItems: "center",
  backgroundColor: colors.white,
  border: "none",
  borderRadius: 4,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  color: "black",
  display: "grid",
  height: 45,
  justifyContent: "center",
  opacity: 0,
  overflow: "hidden",
  pointerEvents: "none",
  transition: `opacity .2s ${easing}`,
  width: 45,

  "@container": {
    [`${scrollContainer} scroll-state(stuck: top)`]: {
      opacity: 0.7,
      pointerEvents: "auto",

      ":hover": {
        opacity: 1,
      },
    },
  },
}));

export const iconClass = css({
  display: "block",
  width: 33,
});

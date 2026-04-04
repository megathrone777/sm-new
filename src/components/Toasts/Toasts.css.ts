import { globalStyle, keyframes } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

import { css, cssVariants } from "@/theme";

const slideInUp = keyframes({
  "0%": { opacity: 0, transform: "translateY(100%)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideOutDown = keyframes({
  "0%": { opacity: 1, transform: "translateY(0)" },
  "100%": { opacity: 0, transform: "translateY(100%)" },
});

globalStyle(".Toastify", {
  alignContent: "end",
  bottom: 0,
  display: "grid",
  height: 0,
  justifyContent: "end",
  position: "sticky",
  width: "100%",
  zIndex: 203,
});

globalStyle(".Toastify__toast-icon", {
  alignItems: "center",
  display: "grid",
  justifyContent: "center",
});

export const containerClass = css(({ devices }) => ({
  selectors: {
    "&.Toastify__toast-container": {
      alignContent: "end",
      alignItems: "end",
      display: "grid",
      gridAutoFlow: "row",
      height: "100dvh",
      justifyContent: "end",
      paddingBottom: 90,
      paddingRight: 10,
      pointerEvents: "none",
      position: "static",
      rowGap: 15,

      "@media": {
        [devices.pointerCoarse]: {
          paddingBottom: `${calc("90px").add("env(safe-area-inset-bottom)")}`,
        },

        [`${devices.mobile} and ${devices.pointerCoarse}`]: {
          paddingBottom: `${calc("120px").add("env(safe-area-inset-bottom)")}`,
        },

        [devices.tablet]: {
          paddingRight: 20,
        },

        [devices.desktop]: {
          paddingBottom: 180,
        },

        [devices.desktopXl]: {
          paddingRight: 40,
        },
      },
    },
  },
}));

export const closeButtonClass = css({
  appearance: "none",
  backgroundColor: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  height: 25,
  marginLeft: 8,
  width: 25,
});

export const iconClass = cssVariants(
  ({ colors }) => ({
    error: {
      backgroundColor: "white",
      color: colors.red,
      paddingBlock: 1,
    },
    success: {
      color: "green",
    },
  }),
  (type) => [
    {
      alignItems: "center",
      borderRadius: "50%",
      display: "grid",
      height: 18,
      justifyContent: "center",
      minWidth: 18,
      width: 18,
    },
    type,
  ],
);

export const toastClass = css(({ colors, devices, easing, fonts }) => ({
  alignItems: "center",
  animationDuration: "300ms",
  animationFillMode: "forwards",
  animationTimingFunction: easing,
  borderRadius: 3,
  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
  display: "grid",
  fontFamily: "inherit",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  gridTemplateColumns: "auto 1fr auto",
  justifyContent: "start",
  marginBottom: 0,
  minHeight: 60,
  overflow: "hidden",
  pointerEvents: "auto",
  selectors: {
    "&.Toastify__toast--error": {
      backgroundColor: colors.red,
      color: "white",
    },

    "&.Toastify__toast--success": {
      backgroundColor: "white",
      color: "green",
    },

    "&.Toastify__toast-body": {
      alignItems: "center",
      display: "grid",
      gridAutoFlow: "column",
      paddingBlock: 6,
      paddingInline: "30px 45px",
    },

    "&.Toastify__toast-slideInUp--bottom-right": {
      animationName: slideInUp,
    },

    "&.Toastify__toast-slideOutDown--bottom-right": {
      animationName: slideOutDown,
    },
  },
  width: 300,

  "@media": {
    [devices.desktop]: {
      width: 450,
    },
  },
}));

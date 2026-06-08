import { keyframes } from "@vanilla-extract/css";

import { rgba, style } from "@/theme";

const dotBlink = keyframes({
  "0%, 80%, 100%": {
    opacity: 0.25,
    transform: "translateY(0)",
  },

  "40%": {
    opacity: 1,
    transform: "translateY(-2px)",
  },
});

export const wrapperClass = style(({ devices }) => ({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "space-between",
  minHeight: 40,
  paddingInline: 14,

  "@media": {
    [devices.desktop]: {
      paddingInline: 18,
    },
  },
}));

export const modelClass = style(({ colors, fonts }) => ({
  alignItems: "center",
  background: rgba(colors.whiteLightest, 0.06),
  border: `1px solid ${rgba(colors.whiteLightest, 0.12)}`,
  borderRadius: 10,
  color: rgba(colors.whiteLightest, 0.84),
  columnGap: 8,
  cursor: "default",
  display: "inline-grid",
  fontSize: 13,
  fontWeight: fonts.demi,
  gridAutoFlow: "column",
  height: 34,
  lineHeight: "34px",
  paddingInline: 10,
}));

export const modelIconClass = style(({ colors }) => ({
  backgroundColor: colors.redLighter,
  borderRadius: 4,
  display: "grid",
  height: 16,
  placeItems: "center",
  width: 16,

  "::before": {
    backgroundColor: colors.whiteLightest,
    borderRadius: "50%",
    content: "''",
    display: "block",
    height: 6,
    width: 6,
  },
}));

export const buttonClass = style(({ colors, easing }) => ({
  appearance: "none",
  backgroundColor: colors.redLighter,
  border: "none",
  borderRadius: 11,
  boxShadow: `0 6px 16px -6px ${rgba(colors.redLighter, 0.8)}`,
  color: colors.whiteLightest,
  cursor: "pointer",
  display: "grid",
  height: 40,
  paddingInline: 12,
  placeItems: "center",
  transform: "translate3d(0, 0, 0)",
  transition: `transform .25s ${easing}`,
  width: 40,

  ":hover": {
    transform: "translate3d(0, -2px, 0)",
  },
}));

export const dotsClass = style({
  alignItems: "center",
  columnGap: 5,
  display: "inline-grid",
  gridAutoFlow: "column",
  paddingBlock: 6,
});

export const dotClass = style(({ colors }) => ({
  animation: `${dotBlink} 1.2s infinite ease-in-out`,
  background: rgba(colors.whiteLightest, 0.55),
  borderRadius: "50%",
  display: "block",
  height: 7,
  width: 7,
}));

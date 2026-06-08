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

export const formClass = style(({ colors, devices }) => ({
  backgroundColor: rgba(colors.blackDarker, 0.55),
  backgroundImage: `linear-gradient(180deg, ${rgba(colors.whiteLightest, 0.07)}, ${rgba(colors.whiteLightest, 0.035)})`,
  border: `1px solid ${rgba(colors.whiteLightest, 0.12)}`,
  borderRadius: 18,
  boxShadow: `0 26px 64px -30px ${rgba(colors.black, 0.85)}, inset 0 1px 0 ${rgba(colors.whiteLightest, 0.06)}`,
  display: "grid",
  gridAutoFlow: "row",
  maxWidth: 600,
  paddingBottom: 12,
  rowGap: 12,
  width: "100%",

  "@media": {
    [devices.desktop]: {
      paddingBottom: 14,
      rowGap: 16,
    },
  },
}));

export const layoutClass = style(({ devices }) => ({
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

export const textareaClass = style(({ colors, devices }) => ({
  backgroundColor: "transparent",
  border: "none",
  color: colors.whiteLightest,
  fieldSizing: "content",
  fontFamily: "inherit",
  fontSize: 15,
  minHeight: 48,
  padding: "17px 14px 8px",
  resize: "none",

  "::placeholder": {
    color: rgba(colors.whiteLightest, 0.4),
  },

  ":focus": {
    outline: "none",
  },

  "@media": {
    [devices.desktop]: {
      fontSize: 17,
      padding: "18px 18px 10px",
    },
  },
}));

export const responseClass = style(({ animations, colors, devices }) => ({
  animation: `${animations.fadeInUp} .3s ease-in`,
  color: colors.whiteLightest,
  fontSize: 15,
  padding: "17px 14px 4px",
  whiteSpace: "pre-wrap",

  "@media": {
    [devices.desktop]: {
      fontSize: 16,
      padding: "18px 18px 6px",
    },
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

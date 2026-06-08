import { rgba, style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  alignContent: "center",
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "stretch",
  justifyItems: "center",
  padding: "30px 5px 20px",
  rowGap: 12,

  "@media": {
    [devices.desktop]: {
      rowGap: 18,
    },
  },
}));

export const titleClass = style(({ colors, devices, fonts }) => ({
  color: colors.white,
  fontSize: 21,
  fontWeight: fonts.bold,
  lineHeight: 1.2,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      fontSize: 27,
    },
  },
}));

export const contentClass = style(({ colors, devices }) => ({
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

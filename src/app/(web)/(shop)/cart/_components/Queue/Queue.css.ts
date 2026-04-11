import { css } from "@/theme";

export const wrapperClass = css(({ devices, fonts }) => ({
  alignItems: "center",
  columnGap: 8,
  display: "grid",
  fontSize: 17,
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  justifyContent: "start",
  marginBottom: 4,
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobileXs]: {
      fontSize: 20,
    },
  },
}));

export const iconClass = css(({ devices }) => ({
  color: "lightgreen",
  display: "block",
  height: 24,
  width: 24,

  "@media": {
    [devices.mobileXs]: {
      height: 26,
      width: 26,
    },
  },
}));

export const amountClass = css(({ colors, fonts }) => ({
  color: colors.red,
  fontWeight: fonts.bold,
  paddingInline: 3,
}));

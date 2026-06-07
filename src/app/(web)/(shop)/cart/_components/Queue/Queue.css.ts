import { style } from "@/theme";

export const wrapperClass = style(({ devices, fonts }) => ({
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

    [devices.desktop]: {
      fontSize: 20,
      marginBottom: 0,
    },
  },
}));

export const iconClass = style(({ devices }) => ({
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

export const amountClass = style(({ colors, fonts }) => ({
  color: colors.red,
  fontWeight: fonts.bold,
  paddingInline: 3,
}));

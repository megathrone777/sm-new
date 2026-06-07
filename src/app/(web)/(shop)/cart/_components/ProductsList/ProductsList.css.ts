import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  minHeight: 232,
  paddingBlock: 4,
  rowGap: 15,

  "@media": {
    [devices.tablet]: {
      minHeight: 150,
    },
  },
}));

export const discountClass = style(({ devices, fonts }) => ({
  fontWeight: fonts.medium,
  marginBottom: 15,
  textAlign: "right",

  "@media": {
    [devices.mobile]: {
      marginBottom: 10,
    },
  },
}));

export const labelClass = style(({ colors, fonts }) => ({
  color: colors.red,
  fontWeight: fonts.bold,
}));

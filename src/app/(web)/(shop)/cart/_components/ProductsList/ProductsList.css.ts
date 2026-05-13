import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
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

export const discountClass = css(({ devices, fonts }) => ({
  fontWeight: fonts.medium,
  marginBottom: 15,
  textAlign: "right",

  "@media": {
    [devices.mobile]: {
      marginBottom: 10,
    },
  },
}));

export const labelClass = css(({ colors, fonts }) => ({
  color: colors.red,
  fontWeight: fonts.bold,
}));

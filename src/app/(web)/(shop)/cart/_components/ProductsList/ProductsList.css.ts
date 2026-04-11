import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  paddingBlock: 4,
  rowGap: 15,

  "@media": {
    [devices.mobile]: {
      // marginBottom: 30,
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

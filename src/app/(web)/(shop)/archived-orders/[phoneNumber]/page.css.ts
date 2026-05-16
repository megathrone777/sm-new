import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  minHeight: 400,
  paddingBlock: "20px 60px",

  "@media": {
    [devices.tablet]: {
      paddingBlock: "30px 80px",
    },
  },
}));

export const titleClass = css(({ devices, fonts }) => ({
  fontSize: 22,
  fontWeight: fonts.bold,
  marginBottom: 16,

  "@media": {
    [devices.tablet]: {
      fontSize: 26,
    },
  },
}));

export const emptyClass = css(({ colors }) => ({
  color: colors.gray,
  marginTop: 24,
}));

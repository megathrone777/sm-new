import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  minHeight: 400,
  paddingBlock: "20px 60px",

  "@media": {
    [devices.tablet]: {
      paddingBlock: "30px 80px",
    },
  },
}));

export const titleClass = style(({ devices, fonts }) => ({
  fontSize: 22,
  fontWeight: fonts.bold,
  marginBottom: 16,

  "@media": {
    [devices.tablet]: {
      fontSize: 26,
    },
  },
}));

export const emptyClass = style(({ colors }) => ({
  color: colors.gray,
  marginTop: 24,
}));

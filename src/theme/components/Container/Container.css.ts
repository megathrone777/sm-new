import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  height: "100%",
  paddingInline: 10,
  width: "100%",

  "@media": {
    [devices.desktopLg]: {
      marginInline: "auto",
      maxWidth: 1300,
    },

    [devices.desktopXl]: {
      maxWidth: 1400,
    },
  },
}));

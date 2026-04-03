import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  backgroundImage: "url('/images/products_bg.jpg')",
  backgroundSize: "33.3333% auto",
  minHeight: 615,
  paddingBlock: 30,

  "@media": {
    [devices.tablet]: {
      minHeight: 1195,
      paddingTop: 60,
    },

    [devices.desktop]: {
      minHeight: 1034,
    },
  },
}));

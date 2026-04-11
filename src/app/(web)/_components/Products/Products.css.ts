import { css, cssVariants } from "@/theme";

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

export const layoutClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 12,

  "@media": {
    [devices.desktop]: {
      rowGap: 15,
    },
  },
}));

export const titleClass = cssVariants(
  ({ devices }) => ({
    isNormal: {
      fontSize: 25,
      paddingLeft: 10,

      "@media": {
        [devices.tablet]: {
          paddingLeft: 0,
        },

        [devices.desktop]: {
          fontSize: 48,
        },
      },
    },

    isSmall: {
      fontSize: 25,
      paddingLeft: 10,

      "@media": {
        [devices.tablet]: {
          paddingLeft: 0,
        },

        [devices.desktop]: {
          fontSize: 40,
        },
      },
    },
  }),
  (size, { fonts }) => [
    {
      fontWeight: fonts.bold,
    },
    size,
  ],
);

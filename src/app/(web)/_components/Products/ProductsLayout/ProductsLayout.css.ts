import { cssVariants } from "@/theme";

export const titleClass = cssVariants(
  ({ devices }) => ({
    isNormal: {
      fontSize: 25,

      "@media": {
        [devices.desktop]: {
          fontSize: 48,
        },
      },
    },

    isSmall: {
      fontSize: 25,

      "@media": {
        [devices.desktop]: {
          fontSize: 40,
        },
      },
    },
  }),
  (size, { fonts }) => [
    {
      fontWeight: fonts.bold,
      paddingInline: 10,
    },
    size,
  ],
);

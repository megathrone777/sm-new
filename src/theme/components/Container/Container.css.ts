import { cssVariant } from "@/theme";

export const wrapperClass = cssVariant(
  ({ devices }) => ({
    default: {
      paddingInline: 10,

      "@media": {
        [devices.desktopLg]: {
          marginInline: "auto",
          maxWidth: 1300,
        },

        [devices.desktopXl]: {
          maxWidth: 1400,
        },
      },
    },

    fluid: {
      paddingInline: 12,
    },
  }),

  (variant) => [
    {
      height: "100%",
      width: "100%",
    },
    variant,
  ],
);

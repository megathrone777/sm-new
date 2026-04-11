import { css, cssVariants } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  marginBottom: 14,

  "@media": {
    [devices.mobile]: {
      marginBottom: 20,
    },

    [devices.tablet]: {
      marginBottom: 25,
    },
  },
}));

export const listClass = css(({ devices }) => ({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "center",
  rowGap: 15,

  "@media": {
    [devices.mobile]: {
      columnGap: 30,
      gridAutoFlow: "column",
    },

    [devices.tablet]: {
      columnGap: 45,
    },
  },
}));

export const linkClass = cssVariants(
  ({ colors }) => ({
    active: colors.red,
    default: "white",
  }),
  (color, { colors, devices, easing }) => [
    {
      cursor: "pointer",
      fontSize: 17,
      textAlign: "center",
      textDecoration: "none",
      transition: `color .2s ${easing}`,

      "@media": {
        [devices.pointerFine]: {
          ":hover": {
            color: colors.red,
          },
        },

        [devices.tablet]: {
          fontSize: 20,
        },
      },
    },
    { color },
  ],
);

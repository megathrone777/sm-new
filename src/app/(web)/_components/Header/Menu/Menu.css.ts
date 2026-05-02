import { css, cssVariants } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  "@media": {
    [devices.desktop]: {
      height: 125,
    },
  },
}));

export const layoutClass = cssVariants<{ isOpened: boolean }>(
  ({ devices }) => ({
    isOpened: {
      off: {
        opacity: 0,
        pointerEvents: "none",

        "@media": {
          [devices.desktop]: {
            opacity: 1,
            pointerEvents: "auto",
          },
        },
      },

      on: {
        opacity: 1,
        pointerEvents: "auto",
      },
    },
  }),

  ({ colors, devices, easing }) => [
    {
      alignContent: "center",
      alignItems: "center",
      backgroundColor: colors.black,
      display: "grid",
      gridAutoFlow: "row",
      height: "100dvh",
      inset: 0,
      justifyContent: "center",
      minHeight: "100dvh",
      position: "absolute",
      rowGap: 30,
      transition: `opacity .2s ${easing}`,
      width: "100%",
      zIndex: 10,

      "@media": {
        [devices.desktop]: {
          backgroundColor: "transparent",
          columnGap: 45,
          gridAutoFlow: "column",
          height: "100%",
          minHeight: 0,
          position: "static",
        },

        [devices.desktopXl]: {
          columnGap: 100,
        },
      },
    },
  ],
);

export const listClass = css(({ devices }) => ({
  alignItems: "center",
  display: "grid",
  rowGap: 15,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      columnGap: 40,
      gridAutoFlow: "column",
      gridColumn: 1,
    },

    [devices.desktopLg]: {
      columnGap: 60,
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
      fontSize: 28,
      transition: `color .2s ${easing}`,
      whiteSpace: "nowrap",

      ":hover": {
        color: colors.red,
      },

      "@media": {
        [devices.desktop]: {
          fontSize: 18,
        },

        [devices.desktopLg]: {
          fontSize: 20,
        },
      },
    },
    { color },
  ],
);

export const contactClass = css(({ devices }) => ({
  "@media": {
    [devices.desktop]: {
      gridColumn: 2,
    },
  },
}));

export const contactLinkClass = css(({ colors, devices, fonts }) => ({
  color: colors.red,
  fontSize: 28,
  fontWeight: fonts.medium,

  "@media": {
    [devices.desktop]: {
      color: "white",
      fontSize: 18,
      paddingLeft: 35,
      position: "relative",

      "&:hover::before": {
        filter: "brightness(120%)",
      },

      "::before": {
        background: "url('/images/header_contact_bg.png') left center/auto 80% no-repeat",
        content: "''",
        display: "inline-block",
        height: 33,
        left: 0,
        position: "absolute",
        top: -4,
        width: 33,
      },
    },

    [devices.desktopLg]: {
      fontSize: 20,
    },
  },
}));

export const burgerClass = css(({ devices }) => ({
  position: "relative",
  zIndex: 100,

  "@media": {
    [devices.desktop]: {
      display: "none",
    },
  },
}));

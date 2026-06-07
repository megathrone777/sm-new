import { rgba, style, styleVariants } from "@/theme";

export const titleClass = styleVariants(
  ({ devices }) => ({
    default: {
      fontSize: 25,

      "@media": {
        [devices.desktop]: {
          fontSize: 48,
        },
      },
    },

    small: {
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

export const tabsListClass = styleVariants(
  ({ devices }) => ({
    collapsed: {
      gap: 10,
      gridTemplateColumns: "repeat(2, 1fr)",

      "@media": {
        [devices.desktop]: {
          gridTemplateColumns: "repeat(5, 1fr)",
        },

        [devices.desktopLg]: { gap: 20 },
      },
    },

    default: {
      gap: 10,
      gridTemplateColumns: "repeat(2, 1fr)",

      "@media": {
        [devices.desktop]: {
          gridTemplateColumns: "repeat(3, 1fr)",
        },

        [devices.desktopLg]: { gap: 20 },
      },
    },
  }),

  (variant) => [
    {
      display: "grid",
    },
    variant,
  ],
);

export const tabClass = styleVariants(
  ({ devices }) => ({
    active: {
      height: 55,
      opacity: 1,

      "@media": {
        [devices.mobileXs]: {
          height: 70,
        },
      },
    },

    collapsed: {
      height: 55,
      opacity: 0.7,

      "@media": {
        [devices.mobileXs]: {
          height: 70,
        },
      },
    },

    default: {
      height: 65,
      opacity: 1,

      "@media": {
        [devices.mobileXs]: {
          height: 90,
        },

        [devices.tablet]: {
          height: 200,
        },
      },
    },
  }),

  (variant, { colors, devices, easing }) => [
    {
      borderRadius: 10,
      boxShadow: `0 0 10px 0 ${rgba(colors.black, 0.5)}`,
      transitionDuration: ".35s",
      transitionProperty: "height, opacity",
      transitionTimingFunction: easing,

      "@media": {
        [devices.mobileXs]: {
          borderRadius: 15,
        },
      },
    },
    variant,
  ],
);

export const tabButtonClass = style(({ devices }) => ({
  border: "none",
  borderRadius: 10,
  display: "block",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  width: "100%",

  "@media": {
    [devices.mobileXs]: {
      borderRadius: 15,
    },
  },
}));

export const tabImageClass = style(({ easing }) => ({
  objectFit: "cover",
  selectors: {
    [`${tabButtonClass}:hover > &`]: {
      transform: "scale(1.05)",
    },
  },
  transition: `transform .5s ${easing}`,
}));

export const tabLabelClass = style(({ devices, fonts }) => ({
  color: "white",
  display: "block",
  fontSize: 18,
  fontWeight: fonts.bold,
  left: 9,
  position: "absolute",
  top: 10,
  userSelect: "none",
  whiteSpace: "nowrap",
  zIndex: 2,

  "@media": {
    [devices.mobileXs]: {
      fontSize: 22,
      left: 18,
      top: 18,
    },

    [devices.tablet]: {
      fontSize: 26,
      left: 20,
      top: 20,
    },

    [devices.desktop]: {
      fontSize: 24,
      left: 12,
    },

    [devices.desktopLg]: {
      fontSize: 27,
      left: 20,
      top: 18,
    },
  },
}));

export const listClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 10,

  "@media": {
    [devices.mobile]: {
      columnGap: 10,
      gridAutoFlow: "unset",
      gridTemplateColumns: "1fr 1fr",
    },

    [devices.desktop]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },

    [devices.desktopLg]: {
      gap: 20,
    },
  },
}));

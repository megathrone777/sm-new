import { css, cssVariants } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  "@media": {
    [devices.desktop]: {
      height: 125,
    },
  },
}));

export const layoutClass = cssVariants(
  {
    default: {
      opacity: 0,
      visibility: "hidden",
    },
    isOpened: {
      opacity: 1,
      visibility: "visible",
    },
  },

  (visible, { colors, devices }) => [
    {
      alignContent: "center",
      alignItems: "center",
      backgroundColor: colors.black,
      display: "grid",
      gridAutoFlow: "row",
      height: "100dvh",
      inset: 0,
      justifyContent: "center",
      position: "absolute",
      rowGap: 30,
      transitionDuration: ".2s",
      transitionProperty: "opacity, visibility",
      visibility: "hidden",
      width: "100%",
      zIndex: 10,

      "@media": {
        [devices.desktop]: {
          gridAutoFlow: "column",
          height: "auto",
          position: "static",
        },
      },
    },
    {
      ...visible,

      "@media": {
        [devices.desktop]: {
          opacity: 1,
          visibility: "visible",
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
      columnGap: 60,
      gridColumn: 1,
    },
  },
}));

export const linkClass = cssVariants(
  ({ colors }) => ({
    default: "white",
    isActive: colors.red,
  }),
  (color) => [
    {
      fontSize: 28,
      whiteSpace: "nowrap",
    },
    {
      color,
    },
  ],
);

// const itemDefaults = css(({ colors, devices }) => ({
//   color: "white",
//   cursor: "pointer",
//   fontSize: rem(20),
//   whiteSpace: "nowrap",

//   "&.is-active": {
//     color: colors.red,
//   },

//   ...hover({
//     color: colors.red,
//   }),

//   [devices.desktop]: {
//     fontSize: rem(18),
//   },

//   [devices.tablet]: {
//     fontSize: rem(28),

//     "@media (orientation: landscape)": {
//       fontSize: rem(25),
//     },
//   },
// }));

// export const linkClass = css(
//   {
//     textDecoration: "none",
//   },
//   itemDefaults,
// );

export const contactClass = css(({ devices }) => ({
  "@media": {
    [devices.desktop]: {
      gridColumn: 2,
    },
  },
}));

export const contactLinkClass = css(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 28,
  fontWeight: fonts.medium,
}));

// export const StyledContactLink = styled.a(({ theme: { colors, devices, fonts, hover, rem } }) => ({
//   color: "white",
//   display: "block",
//   fontSize: rem(20),
//   fontWeight: fonts.medium,
//   lineHeight: rem(34),
//   paddingLeft: rem(35),
//   position: "relative",
//   textDecoration: "none",
//   whiteSpace: "nowrap",

//   [devices.desktop]: {
//     fontSize: rem(18),
//   },

//   [devices.tablet]: {
//     color: colors.red,
//     fontSize: rem(28),
//     paddingLeft: 0,
//   },

//   "&::before": {
//     content: '""',
//     background: 'url("/images/header_contact_bg.png") left center/auto 80% no-repeat',
//     display: "inline-block",
//     height: rem(33),
//     left: 0,
//     position: "absolute",
//     top: rem(-4),
//     width: rem(33),

//     [devices.tablet]: {
//       display: "none",
//     },
//   },

//   ...hover({
//     filter: "brightness(120%)",
//   }),
// }));

export const burgerClass = css(({ devices }) => ({
  position: "relative",
  zIndex: 100,

  "@media": {
    [devices.desktop]: {
      display: "none",
    },
  },
}));

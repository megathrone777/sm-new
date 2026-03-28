import { css } from "@/theme";

export const wrapperClass = css({
  alignItems: "center",
  display: "flex",

  // [devices.tablet]: {
  //   backgroundColor: colors.black,
  //   bottom: 0,
  //   flexDirection: "column-reverse",
  //   left: 0,
  //   opacity: 0,
  //   position: "fixed",
  //   right: 0,
  //   justifyContent: "center",
  //   top: 0,
  //   transition: "visibility 0.2s ease-in, opacity 0.2s ease-in",
  //   visibility: "hidden",
  //   zIndex: 10,
  //   width: "100%",
  //   "&.is-opened": {
  //     opacity: 1,
  //     visibility: "visible",
  //   },
  // },
});

export const listClass = css({
  columnGap: 60,
  display: "flex",
  marginRight: 60,

  // [devices.desktop]: {
  //   columnGap: rem(40),
  // },

  // [devices.tablet]: {
  //   alignItems: "center",
  //   columnGap: "initial",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   marginRight: 0,
  //   rowGap: rem(15),
  // },
});

export const linkClass = css(({ colors }) => ({
  color: "white",
  fontSize: 20,
  textDecoration: "none",
  whiteSpace: "nowrap",

  "&.active": {
    color: colors.red,
  },

  ":hover": {
    color: colors.red,
  },

  // [devices.desktop]: {
  //   fontSize: rem(18),
  // },

  // [devices.tablet]: {
  //   fontSize: rem(28),

  //   "@media (orientation: landscape)": {
  //     fontSize: rem(25),
  //   },
  // },
}));

export const contactClass = css({
  display: "flex",
  justifyContent: "flex-end",
  textAlign: "right",

  // [devices.tablet]: {
  //   marginBottom: rem(20),
  // },

  // [devices.mobile]: {
  //   marginBottom: rem(30),
  // },
});

export const contactLinkClass = css(({ fonts }) => ({
  color: "white",
  display: "block",
  fontSize: 20,
  fontWeight: fonts.medium,
  lineHeight: 34,
  paddingLeft: 35,
  position: "relative",
  textDecoration: "none",
  whiteSpace: "nowrap",

  // [devices.desktop]: {
  //   fontSize: rem(18),
  // },

  // [devices.tablet]: {
  //   color: colors.red,
  //   fontSize: rem(28),
  //   paddingLeft: 0,
  // },

  "::before": {
    background: "url('/images/header_contact_bg.png') left center/auto 80% no-repeat",
    content: "''",
    display: "inline-block",
    height: 33,
    left: 0,
    position: "absolute",
    top: -4,
    width: 33,

    // [devices.tablet]: {
    //   display: "none",
    // },
  },

  ":hover": {
    filter: "brightness(120%)",
  },
}));

export const burgerClass = css({
  display: "none",
  position: "absolute",
  right: 20,
  top: 20,
  zIndex: 100,
  // [devices.tablet]: {
  //   display: "block",
  // },
});

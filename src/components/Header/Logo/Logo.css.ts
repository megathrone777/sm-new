import { css } from "@/theme";

export const wrapperClass = css({
  height: 96,
  marginRight: 90,
  width: 98,

  // [devices.desktop]: {
  //   marginRight: rem(30),
  // },

  // [devices.tablet]: {
  //   height: rem(80),
  //   width: rem(82),
  //   zIndex: 40,
  // },

  // [devices.mobileSm]: {
  //   height: rem(70),
  //   width: rem(72),
  // },
});

export const linkClass = css({
  cursor: "pointer",
  display: "block",
  height: "100%",
  position: "relative",

  ":focus": {
    outline: "none",
  },
});

export const imageClass = css({
  maxWidth: "100%",
});
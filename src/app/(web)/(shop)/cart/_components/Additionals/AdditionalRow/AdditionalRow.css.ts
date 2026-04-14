import { css } from "@/theme";

export const wrapperClass = css(({}) => ({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
  verticalAlign: "middle",

  // [devices.tablet]: {
  //   paddingInline: rem(5),
  //   textAlign: "center",

  //   "&:first-of-type": {
  //     textAlign: "left",
  //   },
  // },
  // [devices.mobileSm]: {
  //   paddingInline: rem(2),
  // },

  // "&.is-small": {
  //   width: "40%",

  //   [devices.mobileSm]: {
  //     whiteSpace: "nowrap",
  //     width: "50%",
  //   },
  // },
}));

export const nameClass = css(({ devices, fonts }) => ({
  fontSize: 14,
  fontWeight: fonts.bold,

  "@media": {
    [devices.mobileXs]: {
      fontSize: 16,
    },
  },
}));

export const priceClass = css(({ devices, fonts }) => ({
  fontSize: 16,
  fontWeight: fonts.bold,
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobileXs]: {
      fontSize: 20,
    },
  },
}));

import { css } from "@/theme";

const defaultClass = css(({ colors, devices, easing, fonts }) => ({
  backgroundColor: colors.red,
  border: "none",
  borderRadius: 5,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "inline-block",
  fontFamily: "inherit",
  fontSize: 18,
  fontWeight: fonts.medium,
  height: 46,
  minWidth: 160,
  paddingInline: 10,
  textAlign: "center",
  textDecoration: "none",
  transition: `box-shadow 0.2s ${easing}`,

  ":hover": {
    boxShadow: "0 0 14px 0 rgba(218, 38, 40, 0.75)",
  },

  "@media": {
    [devices.tablet]: {
      fontSize: 16,
      height: 45,
      minWidth: 140,
    },

    [devices.desktopLg]: {
      fontSize: 22,
      height: 55,
      minWidth: 190,
      paddingInline: 15,
    },
  },
}));

export const buttonClass = css([
  defaultClass,
  {
    ":disabled": {
      cursor: "default",
      opacity: 0.7,
    },
  },
]);

export const linkClass = css(({ devices }) => [
  defaultClass,
  {
    lineHeight: 46,
    textDecoration: "none",

    "@media": {
      [devices.tablet]: {
        lineHeight: 45,
      },

      [devices.desktop]: {
        lineHeight: 55,
      },
    },
  },
]);

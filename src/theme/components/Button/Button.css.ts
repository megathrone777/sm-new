import { css } from "@/theme";

export const buttonClass = css(({ colors, devices, easing, fonts }) => ({
  alignItems: "center",
  backgroundColor: colors.red,
  border: "none",
  borderRadius: 5,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "inline-grid",
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: fonts.medium,
  height: 45,
  justifyContent: "center",
  lineHeight: 1,
  minWidth: 140,
  outline: "none",
  paddingInline: 10,
  textDecoration: "none",
  transition: `box-shadow 0.2s ${easing}`,
  userSelect: "none",

  ":disabled": {
    cursor: "default",
    opacity: 0.7,
  },

  ":hover": {
    boxShadow: "0 0 14px 0 rgba(218, 38, 40, 0.75)",
  },

  "@media": {
    [devices.tablet]: {
      fontSize: 18,
      height: 46,
      minWidth: 155,
    },

    [devices.desktop]: {
      fontSize: 21,
      height: 55,
      minWidth: 190,
      paddingInline: 15,
    },
  },
}));

export const labelClass = css(({ devices }) => ({
  "@media": {
    [devices.pointerFine]: {
      transform: "translateY(-1px)",
    },
  },
}));

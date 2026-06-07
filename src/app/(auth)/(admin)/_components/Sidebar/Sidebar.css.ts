import { style, styleVariants } from "@/theme";

export const wrapperClass = style(({ colors, devices }) => ({
  backgroundColor: "white",
  borderRight: `1px solid ${colors.grayDarkest}`,
  bottom: 0,
  left: 0,
  overflowY: "auto",
  padding: 16,
  position: "fixed",
  top: 80,
  transform: "translateX(-100%)",
  transition: "transform 0.3s ease",
  width: 260,
  zIndex: 102,

  "@media": {
    [devices.tablet]: {
      backgroundColor: "transparent",
      border: "none",
      height: "100%",
      overflow: "visible",
      padding: 0,
      position: "sticky",
      top: 106,
      transform: "none",
      transition: "none",
      width: "auto",
    },
  },
}));

export const openClass = style(({ devices }) => ({
  transform: "translateX(0)",

  "@media": {
    [devices.tablet]: {
      transform: "none",
    },
  },
}));

export const layoutClass = style({
  position: "relative",
});

export const itemClass = style(({ colors }) => ({
  borderBottom: `2px solid ${colors.grayDarkest}`,

  ":last-of-type": {
    borderBottom: "none",
  },
}));

export const linkClass = styleVariants(
  ({ colors }) => ({
    default: colors.black,
    isActive: colors.red,
  }),
  (color, { colors, fonts }) => [
    {
      display: "block",
      fontSize: 18,
      fontWeight: fonts.demi,
      lineHeight: "42px",
      minHeight: 42,
      whiteSpace: "nowrap",

      ":hover": {
        color: colors.red,
      },
    },
    {
      color,
    },
  ],
);

export const dividerClass = style(({ colors }) => ({
  backgroundColor: colors.red,
  border: "none",
  display: "block",
  height: 3,
  marginBlock: 8,
  padding: 0,
}));

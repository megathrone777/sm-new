import { css, cssVariant } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
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
  zIndex: 101,

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

export const openClass = css(({ devices }) => ({
  transform: "translateX(0)",

  "@media": {
    [devices.tablet]: {
      transform: "none",
    },
  },
}));

export const layoutClass = css({
  position: "relative",
});

export const itemClass = css(({ colors }) => ({
  borderBottom: `2px solid ${colors.grayDarkest}`,

  ":last-of-type": {
    borderBottom: "none",
  },
}));

export const linkClass = cssVariant(
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

export const dividerClass = css(({ colors }) => ({
  backgroundColor: colors.red,
  border: "none",
  display: "block",
  height: 3,
  marginBlock: 8,
  padding: 0,
}));

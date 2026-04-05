import { css, cssVariants } from "@/theme";

export const wrapperClass = css({
  position: "sticky",
  top: 98,
  zIndex: 100,
});

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 15,
});

export const itemClass = css(({ colors }) => ({
  borderBottom: `2px solid ${colors.grayDarkest}`,

  ":last-of-type": {
    borderBottom: "none",
  },
}));

export const linkClass = cssVariants(
  ({ colors }) => ({
    default: colors.black,
    isActive: colors.red,
  }),
  (color, { colors, fonts }) => [
    {
      display: "block",
      fontSize: 18,
      fontWeight: fonts.demi,
      lineHeight: "40px",
      minHeight: 40,
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

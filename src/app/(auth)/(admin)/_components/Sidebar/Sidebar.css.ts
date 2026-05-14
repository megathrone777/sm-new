import { css, cssVariant } from "@/theme";

export const wrapperClass = css({
  height: "100%",
});

export const layoutClass = css({
  position: "sticky",
  top: 106,
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

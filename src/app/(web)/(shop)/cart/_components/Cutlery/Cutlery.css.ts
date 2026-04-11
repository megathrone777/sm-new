import { css, cssVariants } from "@/theme";

export const wrapperClass = css({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 15,
});

export const layoutClass = css({
  alignItems: "center",
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const nameClass = cssVariants(
  ({ colors }) => ({
    default: {
      color: colors.black,
    },
    error: {
      color: colors.red,
    },
  }),
  (variant, { fonts }) => [
    {
      fontSize: 18,
      fontWeight: fonts.bold,
    },
    variant,
  ],
);

export const priceClass = css(({ colors, fonts }) => ({
  color: colors.black,
  fontSize: 18,
  fontWeight: fonts.bold,
}));

export const quantityClass = css({
  alignItems: "center",
  columnGap: 20,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const quantityAmountClass = css(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
}));

export const errorIconClass = css(({ colors }) => ({
  color: colors.red,
  display: "inline-block",
  height: 20,
  marginRight: 10,
  width: 20,
}));

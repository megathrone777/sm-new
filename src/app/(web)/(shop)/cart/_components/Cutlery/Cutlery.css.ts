import { css, cssVariants } from "@/theme";

export const wrapperClass = css({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 15,
});

export const layoutClass = cssVariants(
  ({ colors }) => ({
    default: {
      color: colors.black,
    },
    error: {
      color: colors.red,
      selectors: {
        [`${wrapperClass}:focus-within &`]: {
          color: colors.black,
        },
      },
    },
  }),
  (variant) => [
    {
      alignItems: "center",
      columnGap: 20,
      display: "grid",
      gridAutoFlow: "column",
      justifyContent: "start",
    },
    variant,
  ],
);

export const nameClass = css(({ fonts }) => ({
  alignItems: "center",
  color: "inherit",
  columnGap: 10,
  display: "inline-grid",
  fontSize: 18,
  fontWeight: fonts.bold,
  gridAutoFlow: "column",
  minWidth: 105,
}));

export const priceClass = css(({ fonts }) => ({
  color: "inherit",
  fontSize: 18,
  fontWeight: fonts.bold,
}));

export const quantityClass = css({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const quantityAmountClass = css(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
  textAlign: "center",
  width: 50,
}));

export const errorIconClass = css({
  display: "inline-block",
  height: 20,
  selectors: {
    [`${wrapperClass}:focus-within &`]: {
      display: "none",
    },
  },
});

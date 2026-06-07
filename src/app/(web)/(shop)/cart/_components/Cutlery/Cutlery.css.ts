import { style, styleVariants } from "@/theme";

export const wrapperClass = style({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 15,
});

export const layoutClass = styleVariants(
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

export const nameClass = style(({ fonts }) => ({
  alignItems: "center",
  color: "inherit",
  columnGap: 10,
  display: "inline-grid",
  fontSize: 18,
  fontWeight: fonts.bold,
  gridAutoFlow: "column",
  minWidth: 105,
}));

export const priceClass = style(({ fonts }) => ({
  color: "inherit",
  fontSize: 18,
  fontWeight: fonts.bold,
}));

export const quantityClass = style({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const quantityAmountClass = style(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
  textAlign: "center",
  width: 50,
}));

export const errorIconClass = style({
  display: "inline-block",
  height: 20,
  selectors: {
    [`${wrapperClass}:focus-within &`]: {
      display: "none",
    },
  },
});

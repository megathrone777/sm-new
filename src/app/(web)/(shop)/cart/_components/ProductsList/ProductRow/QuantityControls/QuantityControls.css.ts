import { css } from "@/theme";

export const priceClass = css(({ fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
  whiteSpace: "nowrap",
}));

export const removeButtonClass = css(({ colors, fonts }) => ({
  background: "none",
  border: "none",
  color: colors.red,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: fonts.medium,

  ":hover": {
    opacity: 0.8,
  },
}));

export const quantityClass = css({
  alignItems: "center",
  columnGap: 20,
  display: "grid",
  gridAutoFlow: "column",
});

export const quantityAmountClass = css(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
}));

export const optionsClass = css({
  textAlign: "center",
});

import { css } from "@/theme";

export const priceClass = css(({ fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
  whiteSpace: "nowrap",
}));

export const removeButtonClass = css(({ colors, devices, fonts }) => ({
  background: "none",
  border: "none",
  color: colors.red,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: fonts.medium,

  ":hover": {
    opacity: 0.8,
  },

  "@media": {
    [devices.desktop]: {
      fontSize: 17,
      lineHeight: "28px",
    },
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
  userSelect: "none",
}));

export const optionsClass = css(({ devices }) => ({
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      columnGap: 30,
      display: "inline-grid",
      gridAutoFlow: "column",
    },
  },
}));

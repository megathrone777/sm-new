import { style } from "@/theme";

export const priceClass = style(({ fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
  whiteSpace: "nowrap",
}));

export const removeButtonClass = style(({ colors, devices, fonts }) => ({
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

export const quantityClass = style({
  alignItems: "center",
  columnGap: 20,
  display: "grid",
  gridAutoFlow: "column",
});

export const quantityAmountClass = style(({ fonts }) => ({
  fontSize: 18,
  fontWeight: fonts.bold,
  userSelect: "none",
}));

export const optionsClass = style(({ devices }) => ({
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      columnGap: 30,
      display: "inline-grid",
      gridAutoFlow: "column",
    },
  },
}));

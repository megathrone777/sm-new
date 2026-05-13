import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 6,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr auto minmax(60px, auto)",
  justifyItems: "stretch",
  verticalAlign: "middle",

  "@media": {
    [devices.mobileXs]: {
      columnGap: 8,
      gridTemplateColumns: "50% 25% 25%",
      justifyItems: "center",
    },

    [devices.desktop]: {
      columnGap: 10,
      gridTemplateColumns: "40% 30% 30%",
    },
  },
}));

export const nameClass = css(({ devices, fonts }) => ({
  fontSize: 14,
  fontWeight: fonts.bold,

  "@media": {
    [devices.mobileXs]: {
      fontSize: 16,
      justifySelf: "start",
    },

    [devices.desktop]: {
      whiteSpace: "nowrap",
    },
  },
}));

export const priceClass = css(({ devices, fonts }) => ({
  fontSize: 16,
  fontWeight: fonts.bold,
  textAlign: "center",
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobileXs]: {
      fontSize: 20,
    },
  },
}));

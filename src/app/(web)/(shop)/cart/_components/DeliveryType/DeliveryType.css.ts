import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "start",
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "center",
  minHeight: 55,
  paddingTop: 8,

  "@media": {
    [devices.mobile]: {
      columnGap: 30,
    },
  },
}));

export const labelClass = css(({ devices }) => ({
  fontSize: 15,
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobileXs]: {
      fontSize: 16,
    },
  },
}));

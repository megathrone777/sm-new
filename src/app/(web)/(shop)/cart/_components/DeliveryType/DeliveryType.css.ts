import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignContent: "center",
  alignItems: "center",
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "center",
  paddingBlock: 8,

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

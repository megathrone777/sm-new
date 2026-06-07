import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  alignItems: "start",
  columnGap: 16,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
  minHeight: 55,
  paddingTop: 8,

  "@media": {
    [devices.mobile]: {
      columnGap: 30,
    },

    [devices.tablet]: {
      justifyContent: "start",
    },

    [devices.desktop]: {
      paddingLeft: 3,
    },
  },
}));

export const labelClass = style(({ devices }) => ({
  fontSize: 15,
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobileXs]: {
      fontSize: 16,
    },
  },
}));

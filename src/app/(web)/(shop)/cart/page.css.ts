import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  minHeight: 570,
  paddingBlock: "15px 40px",

  "@media": {
    [devices.mobile]: {
      paddingTop: 20,
    },
  },
}));

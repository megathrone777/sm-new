import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  minHeight: 570,
  paddingBlock: "15px 40px",

  "@media": {
    [devices.mobile]: {
      paddingTop: 20,
    },
  },
}));

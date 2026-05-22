import { css } from "@/theme";

export const layoutClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  overflow: "hidden",

  "@media": {
    [devices.mobile]: {},
  },
}));

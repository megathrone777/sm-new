import { style } from "@/theme";

export const layoutClass = style(({ devices }) => ({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  overflow: "hidden",

  "@media": {
    [devices.mobile]: {},
  },
}));

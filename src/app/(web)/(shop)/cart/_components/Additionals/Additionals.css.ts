import { style } from "@/theme";

export const wrapperClass = style({
  display: "grid",
  gridAutoFlow: "row",
  minHeight: 220,
  overflow: "hidden",
  rowGap: 15,
  textAlign: "left",
});

export const listClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  maxWidth: 500,
  rowGap: 10,

  "@media": {
    [devices.tablet]: {
      maxWidth: 480,
    },
  },
}));

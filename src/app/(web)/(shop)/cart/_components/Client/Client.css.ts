import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,

  "@media": {
    [devices.tablet]: {
      maxWidth: 437,
    },
  },
}));

export const layoutClass = style({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,
});

export const contentClass = style({
  alignItems: "center",
  display: "flex",
  gap: 12,
});

export const phoneWrapperClass = style({
  flex: 1,
  minWidth: 0,
});

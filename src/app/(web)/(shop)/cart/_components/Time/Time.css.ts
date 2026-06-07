import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  alignItems: "center",
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr",
  paddingBottom: 20,
  paddingLeft: 6,

  "@media": {
    [devices.tablet]: {
      maxWidth: 437,
    },
  },
}));

export const labelClass = style({
  alignItems: "center",
  columnGap: 10,
  display: "inline-grid",
  gridAutoFlow: "column",
  justifyContent: "start",
  whiteSpace: "nowrap",
});

export const iconClass = style(({ colors }) => ({
  color: colors.red,
  height: 18,
  minWidth: 18,
}));

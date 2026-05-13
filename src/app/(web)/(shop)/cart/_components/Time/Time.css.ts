import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr",
  overflow: "hidden",
  paddingBottom: 20,
  paddingLeft: 6,

  "@media": {
    [devices.tablet]: {
      maxWidth: 437,
    },
  },
}));

export const labelClass = css({
  alignItems: "center",
  columnGap: 10,
  display: "inline-grid",
  gridAutoFlow: "column",
  justifyContent: "start",
  whiteSpace: "nowrap",
});

export const iconClass = css(({ colors }) => ({
  color: colors.red,
  height: 18,
  minWidth: 18,
}));

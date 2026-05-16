import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,

  "@media": {
    [devices.tablet]: {
      maxWidth: 437,
    },
  },
}));

export const layoutClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,
});

export const contentClass = css({
  alignItems: "center",
  display: "flex",
  gap: 12,
});

export const phoneWrapperClass = css({
  flex: 1,
  minWidth: 0,
});

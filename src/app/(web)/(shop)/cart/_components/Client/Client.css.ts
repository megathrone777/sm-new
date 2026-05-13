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

export const inputsClass = css({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,
});

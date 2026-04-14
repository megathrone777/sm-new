import { css } from "@/theme";

export const wrapperClass = css({
  display: "grid",
  gridAutoFlow: "row",
  minHeight: 220,
  rowGap: 15,
  textAlign: "left",
});

export const listClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  maxWidth: 500,
  rowGap: 10,

  "@media": {
    [devices.desktop]: {
      maxWidth: 480,
    },
  },
}));

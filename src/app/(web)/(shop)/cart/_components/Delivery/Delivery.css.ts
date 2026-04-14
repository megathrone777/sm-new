import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 10,

  "@media": {
    [devices.desktop]: {
      maxWidth: 437,
    },
  },
}));

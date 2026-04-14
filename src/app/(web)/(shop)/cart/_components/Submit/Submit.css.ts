import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "end",
  justifyItems: "end",
  rowGap: 22,

  "@media": {
    [devices.desktop]: {
      gridArea: "submit",
    },
  },
}));

export const priceClass = css(({ fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
}));

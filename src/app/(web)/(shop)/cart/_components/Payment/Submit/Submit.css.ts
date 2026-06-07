import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
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

export const priceClass = style(({ fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
}));

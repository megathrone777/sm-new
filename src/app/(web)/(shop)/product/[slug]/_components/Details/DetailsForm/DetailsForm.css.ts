import { style } from "@/theme";

export const footerClass = style(({ devices }) => ({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "end",

  "@media": {
    [devices.mobile]: {
      justifyContent: "start",
    },
  },
}));

export const totalPriceClass = style(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 22,
  fontWeight: fonts.medium,
  marginBottom: 20,
  paddingTop: 15,
}));

export const totalPriceValueClass = style(({ fonts }) => ({
  color: "black",
  fontSize: 24,
  fontWeight: fonts.medium,
  marginRight: 10,
}));

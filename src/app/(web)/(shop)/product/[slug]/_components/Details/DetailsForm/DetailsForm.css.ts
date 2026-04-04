import { css } from "@/theme";

export const footerClass = css({
  alignItems: "center",
  columnGap: 10,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const totalPriceClass = css(({ colors, fonts }) => ({
  color: colors.red,
  fontSize: 22,
  fontWeight: fonts.medium,
  marginBottom: 20,
  paddingTop: 15,
}));

export const totalPriceValueClass = css(({ fonts }) => ({
  color: "black",
  fontSize: 24,
  fontWeight: fonts.medium,
  marginRight: 10,
}));

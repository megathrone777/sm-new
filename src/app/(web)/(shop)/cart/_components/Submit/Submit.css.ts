import { css } from "@/theme";

export const wrapperClass = css({
  display: "grid",
  gridArea: "submit",
  gridAutoFlow: "row",
  justifyContent: "flex-end",
  rowGap: 22,
});

export const priceClass = css(({ fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
}));

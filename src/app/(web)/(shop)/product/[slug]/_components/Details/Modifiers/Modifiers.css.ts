import { css } from "@/theme";

export const wrapperClass = css({
  paddingBottom: 10,
  whiteSpace: "nowrap",
});

export const listClass = css({
  margin: "5px 0 10px 20px",
  paddingBottom: 10,
});

export const itemClass = css({
  marginBottom: 10,
});

export const priceClass = css(({ colors }) => ({
  color: colors.red,
}));

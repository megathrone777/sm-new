import { css } from "@/theme";

export const listClass = css({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 8,
  paddingLeft: 10,
  rowGap: 8,
});

export const titleClass = css(({ fonts }) => ({
  fontSize: 17,
  fontWeight: fonts.demi,
  marginBottom: 7,
}));

export const modifierClass = css(({ fonts }) => ({
  fontSize: 16,
  fontWeight: fonts.medium,
  lineHeight: "1.2",

  ":before": {
    content: "-",
    display: "inline-block",
    marginRight: 4,
  },
}));

export const subModifierClass = css(({ fonts }) => ({
  display: "block",
  fontSize: 15,
  fontWeight: fonts.normal,
  paddingTop: 2,

  ":before": {
    content: "--",
    display: "inline-block",
    marginRight: 4,
  },
}));

export const quantityClass = css({
  display: "inline-block",
  paddingLeft: 5,
});
